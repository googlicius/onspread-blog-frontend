import buildUrl from './build-url';

describe('Build Url test', () => {
  test('Page is 2', () => {
    const url = buildUrl('http://google.com/post', {
      queryParams: {
        page: 2,
      },
    });

    expect(url.toString()).toEqual('http://google.com/post?page=2');
  });

  test('Page and sort ', () => {
    const url = buildUrl('http://google.com/post?page=2', {
      queryParams: {
        sort: 'title:asc',
      },
    });

    expect(url.toString()).toEqual(
      'http://google.com/post?page=2&sort=title%3Aasc',
    );
  });

  test('Url is omitted', () => {
    const url = buildUrl({
      queryParams: {
        page: 2,
        sort: 'title:desc',
      },
    });

    expect(url.toString()).toEqual('/?page=2&sort=title%3Adesc');
  });

  test('Url is relative path', () => {
    const url = buildUrl('images', {
      queryParams: {
        page: 3,
        sort: 'title:desc',
      },
    });

    expect(url.toString()).toEqual('/images?page=3&sort=title%3Adesc');
  });

  test('Replace new query params', () => {
    const url = buildUrl('images?page=2', {
      queryParams: {
        page: 3,
        sort: 'title:desc',
      },
    });

    expect(url.toString()).toEqual('/images?page=3&sort=title%3Adesc');
  });

  test('Delete existing query param', () => {
    const url = buildUrl('images?page=2&sort=title:asc', {
      queryParams: {
        page: null,
      },
    });

    expect(url.toString()).toEqual('/images?sort=title%3Aasc');
  });
});
