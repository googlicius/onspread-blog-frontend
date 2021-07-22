import remove from 'lodash/remove';

const loadingUrls: string[] = [];

const isLoading = (url: string) => {
  return loadingUrls.includes(url);
};

const createElement = (d, s, src) => {
  const js = d.createElement(s);
  js.src = src;
  return js;
};

/**
 * Load js file(s) asynchonously.
 *
 * @param url url of JS file
 * @param cb Callback after file has loaded.
 * @param waitSrc src of element that being waited to load.
 * @returns Promise<any>
 */
export const loadAsyncJS = async (
  url: string | string[],
  waitSrc: string = null,
): Promise<void> => {
  const run = async () => {
    const fjs = document.getElementsByTagName('script')[0];
    const promises: Promise<void>[] = [];

    if (typeof url === 'string') {
      url = [url];
    }

    url.forEach((urlStr) => {
      const existingJsEl = document.querySelector(`[src="${urlStr}"]`);

      if (!existingJsEl || isLoading(urlStr)) {
        let jsEl;

        if (isLoading(urlStr)) {
          jsEl = existingJsEl;
        } else {
          jsEl = createElement(document, 'script', urlStr);
          fjs.parentNode.insertBefore(jsEl, fjs);
          loadingUrls.push(urlStr);
        }

        const promise: Promise<void> = new Promise((resolve) => {
          addOnloadHandler(jsEl, () => {
            jsEl.setAttribute('data-loaded', 'true');
            remove(loadingUrls, (loadingUrl) => loadingUrl === urlStr);
            resolve();
          });
        });
        promises.push(promise);
      }
    });

    await Promise.all(promises);
  };

  const waitEl = document.querySelector<HTMLElement>(waitSrc);

  if (waitEl && !waitEl.getAttribute('data-loaded')) {
    addOnloadHandler(waitEl, () => run());
  } else {
    await run();
  }
};

/**
 * Method to add one or more function handler on an element's onload event
 * This is because onload cannot carry out many separate functions.
 *
 * @export
 * @param element DOM element
 * @param handler function
 */
export const addOnloadHandler = (element, handler) => {
  if (typeof element.onload === 'function') {
    const preFunc = element.onload;
    element.onload = () => {
      preFunc();
      handler();
    };
  } else {
    element.onload = handler;
  }
};
