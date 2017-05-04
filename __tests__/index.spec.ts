import serialFetch from '../index';

function delay(time: number, fail: boolean = false) {
  return new Promise<number>((resolve, reject) => {
    setTimeout(() => (fail ? reject : resolve)(Date.now()), time);
  });
}

describe('serial-fetch', () => {
  it('tests single successful fetch', () => {
    window.fetch = jest.fn(() => delay(10));
    const fetch = serialFetch(window.fetch);
    return fetch('foo').then(() => {
      expect(window.fetch).toBeCalled();
    });
  });

  it('tests single unsuccessful fetch', () => {
    window.fetch = jest.fn(() => delay(10, true));
    const fetch = serialFetch(window.fetch);
    return fetch('foo').catch(() => {
      expect(window.fetch).toBeCalled();
    });
  });

  it('tests that many successful fetches fired simultaneously are proceed serially', () => {
    const time = 10;
    window.fetch = jest.fn(() => delay(time));
    const fetch = serialFetch(window.fetch);
    const promises = [fetch('foo'), fetch('foo'), fetch('foo')];
    return Promise.all(promises).then((r) => {
      expect(window.fetch).toHaveBeenCalledTimes(promises.length);
      const result = ((r as any) as number[]).reduce<[boolean, number]>(([result, prevTimestamp], timestamp) => [result && (prevTimestamp ? (timestamp - prevTimestamp) >= time : true), timestamp], [true, null]);
      expect(result[0]).toBe(true);
    });
  });
});
