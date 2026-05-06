import axios from 'axios';
import {
  attachGlobalApiLoading,
  getPendingRequestCount,
  resetGlobalApiLoadingForTests,
  subscribeGlobalApiLoading,
} from '../config/global-api-loading';

describe('global-api-loading', () => {
  beforeEach(() => {
    resetGlobalApiLoadingForTests();
  });

  it('starts at zero and notifies immediate subscribers', () => {
    const received: number[] = [];
    subscribeGlobalApiLoading((n) => received.push(n));
    expect(received).toEqual([0]);
    expect(getPendingRequestCount()).toBe(0);
  });

  it('increments and decrements without going negative', () => {
    expect(getPendingRequestCount()).toBe(0);
    const client = axios.create({
      adapter: async () => ({
        data: null,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as import('axios').InternalAxiosRequestConfig,
      }),
    });
    attachGlobalApiLoading(client);

    return client.get('http://test.local/ok').then(() => {
      expect(getPendingRequestCount()).toBe(0);
    });
  });

  it('decrements on response error', () => {
    const client = axios.create({
      adapter: async () => {
        throw Object.assign(new Error('nope'), {
          config: { url: 'http://test.local/fail' },
          isAxiosError: true,
          response: { status: 500, data: {}, headers: {}, statusText: 'ERR' },
        });
      },
    });
    attachGlobalApiLoading(client);

    return client.get('http://test.local/fail').catch(() => {
      expect(getPendingRequestCount()).toBe(0);
    });
  });

  it('respects skipGlobalLoading on success', async () => {
    const client = axios.create({
      adapter: async (config) => ({
        data: null,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      }),
    });
    attachGlobalApiLoading(client);

    await client.get('http://test.local/skip', { skipGlobalLoading: true });
    expect(getPendingRequestCount()).toBe(0);
  });

  it('unsubscribes without leaking listeners', () => {
    let calls = 0;
    const unsub = subscribeGlobalApiLoading(() => {
      calls += 1;
    });
    expect(calls).toBeGreaterThanOrEqual(1);
    unsub();

    const client = axios.create({
      adapter: async (config) => ({
        data: null,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      }),
    });
    attachGlobalApiLoading(client);

    return client.get('http://test.local/x').then(() => {
      expect(calls).toBe(1);
    });
  });
});
