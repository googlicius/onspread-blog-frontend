import { loadScript } from '@googlicius/load-assets';

const loadPrism = async (): Promise<void[]> => {
  // Manual highlighting
  window.Prism = window.Prism || {};
  window.Prism.manual = true;

  return loadScript([
    'https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/prism.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/plugins/autoloader/prism-autoloader.min.js',
  ]);
};

export default loadPrism;
