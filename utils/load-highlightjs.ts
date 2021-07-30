import { loadAsyncCss, loadAsyncJs } from '@googlicius/load-assets';

const loadHighlightJs = async () => {
  loadAsyncCss(
    '//cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.1.0/build/styles/default.min.css',
  );
  await loadAsyncJs(
    '//cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.1.0/build/highlight.min.js',
  );
};

export default loadHighlightJs;
