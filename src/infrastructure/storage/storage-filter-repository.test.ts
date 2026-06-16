import { describe, expect, it } from 'vitest';
import { StorageFilterRepository } from './storage-filter-repository';
import { STORAGE_KEY } from './schema';
import type { KeyValueStore } from './key-value-store';
import { AuthorId, createFilterRule, type FilterRule } from '@/domain';

class FakeStore implements KeyValueStore {
  private readonly map = new Map<string, unknown>();
  async read<T>(key: string): Promise<T | undefined> {
    return this.map.get(key) as T | undefined;
  }
  async write(key: string, value: unknown): Promise<void> {
    this.map.set(key, value);
  }
  seed(key: string, value: unknown): void {
    this.map.set(key, value);
  }
}

const NOW = 1_000_000;
const rule = (author: string, mode: FilterRule['mode'] = 'hidden'): FilterRule =>
  createFilterRule({ platformId: 'whatsapp-web', authorId: AuthorId(author), mode, now: NOW });

describe('StorageFilterRepository', () => {
  it('load sobre store vacio devuelve []', async () => {
    const repo = new StorageFilterRepository(new FakeStore());
    expect(await repo.load('whatsapp-web')).toEqual([]);
  });

  it('round-trip: save y luego load devuelve las mismas reglas', async () => {
    const repo = new StorageFilterRepository(new FakeStore());
    const rules = [rule('alice'), rule('bob', 'placeholder')];
    await repo.save('whatsapp-web', rules);
    expect(await repo.load('whatsapp-web')).toEqual(rules);
  });

  it('save no pisa las reglas de otras plataformas en el contenedor', async () => {
    const store = new FakeStore();
    store.seed(STORAGE_KEY, {
      schemaVersion: 1,
      platforms: {
        'telegram-web': { rules: [{ authorId: 'x', mode: 'hidden', until: null, createdAt: NOW }] },
      },
    });
    const repo = new StorageFilterRepository(store);
    await repo.save('whatsapp-web', [rule('alice')]);
    const raw = await store.read<{ platforms: Record<string, unknown> }>(STORAGE_KEY);
    expect(raw?.platforms['telegram-web']).toBeDefined();
    expect(raw?.platforms['whatsapp-web']).toBeDefined();
  });

  it('load descarta un registro con mode invalido sin lanzar', async () => {
    const store = new FakeStore();
    store.seed(STORAGE_KEY, {
      schemaVersion: 1,
      platforms: {
        'whatsapp-web': {
          rules: [
            { authorId: 'alice', mode: 'hidden', until: null, createdAt: NOW },
            { authorId: 'bad', mode: 'NOPE', until: null, createdAt: NOW },
          ],
        },
      },
    });
    const repo = new StorageFilterRepository(store);
    expect(await repo.load('whatsapp-web')).toEqual([rule('alice')]);
  });
});