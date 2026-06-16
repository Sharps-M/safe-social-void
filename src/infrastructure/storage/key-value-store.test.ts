import { beforeEach, describe, expect, it } from 'vitest';
import { fakeBrowser } from 'wxt/testing';
import { BrowserKeyValueStore } from './key-value-store';

describe('BrowserKeyValueStore', () => {
  beforeEach(() => {
    fakeBrowser.reset();
  });

  it('write y read recuperan el valor', async () => {
    const store = new BrowserKeyValueStore(fakeBrowser.storage.local);
    await store.write('k', { a: 1 });
    expect(await store.read('k')).toEqual({ a: 1 });
  });

  it('read de una key inexistente devuelve undefined', async () => {
    const store = new BrowserKeyValueStore(fakeBrowser.storage.local);
    expect(await store.read('missing')).toBeUndefined();
  });

  it('write sobrescribe el valor previo', async () => {
    const store = new BrowserKeyValueStore(fakeBrowser.storage.local);
    await store.write('k', 'v1');
    await store.write('k', 'v2');
    expect(await store.read('k')).toBe('v2');
  });
});