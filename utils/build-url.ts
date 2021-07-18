interface UrlOptions {
  queryParams: {
    [x: string]: any;
  };
}

export default function buildUrl(
  strUrl: string | UrlOptions,
  options?: UrlOptions,
) {
  let url: URL;
  let isValidUrl = false;

  if (typeof strUrl === 'string') {
    try {
      url = new URL(strUrl);
    } catch (error) {
      isValidUrl = true;
      const host =
        typeof window === 'undefined'
          ? 'http://example.com'
          : window.location.origin;
      url = new URL(`${host}/${strUrl}`);
    }
  } else {
    isValidUrl = true;
    url =
      typeof window === 'undefined'
        ? new URL('http://example.com')
        : new URL(window.location.href);
  }

  const _options = typeof strUrl === 'string' ? options : strUrl;

  if (_options?.queryParams) {
    for (const key in _options.queryParams) {
      if (Object.prototype.hasOwnProperty.call(_options.queryParams, key)) {
        const element = _options.queryParams[key];
        if (!element) {
          url.searchParams.delete(key);
        } else {
          url.searchParams.set(key, element);
        }
      }
    }
  }

  if (isValidUrl) {
    return url.pathname + url.search;
  }

  return url.toString();
}