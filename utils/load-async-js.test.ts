/**
 * @jest-environment jsdom
 */

import { loadAsyncJS } from './load-async-js';

describe('Test load async js', () => {
  test('External lib loaded and initialized globaly', (done) => {
    document.body.innerHTML = `
      <div>
        <script></script>
      <div>
    `;

    loadAsyncJS(
      'https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.2/min/tiny-slider.js',
    ).then(() => {
      expect(window['tns']).toBeTruthy();
      done();
    });
  });

  test('One external lib load 3 times, but initialize only once.', async () => {
    document.body.innerHTML = `
      <div>
        <script></script>
      <div>
    `;

    const person = {
      name: 'Dang',
      title: 'gentleman',
      hobby: 'football',
    };

    const scriptUrl =
      'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js';

    const getAttr = async (name: string) => {
      await loadAsyncJS(scriptUrl);

      return window['_'].get(person, name);
    };

    const [name, title, hobby] = await Promise.all([
      getAttr('name'),
      getAttr('title'),
      getAttr('hobby'),
    ]);
    const scriptEls = document.querySelectorAll(`[src="${scriptUrl}"]`);

    expect(name).toEqual('Dang');
    expect(title).toEqual('gentleman');
    expect(hobby).toEqual('football');
    expect(scriptEls.length).toEqual(1);
  });
});
