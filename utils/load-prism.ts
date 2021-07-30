import { loadAsyncCss, loadAsyncJs } from '@googlicius/load-assets';

const loadPrism = (): Promise<void[]> => {
  // Manual highlighting
  window.Prism = window.Prism || {};
  window.Prism.manual = true;

  loadAsyncCss('/prism/prism.css');
  return loadAsyncJs('/prism/prism.js');
};

export default loadPrism;
