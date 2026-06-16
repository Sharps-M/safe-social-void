import {
  AuthorId,
  isHideMode,
  type FilterRepository,
  type FilterRule,
  type PlatformId,
} from '@/domain';
import type { KeyValueStore } from './key-value-store';
import { migrate, STORAGE_KEY, type PersistedRuleV1 } from './schema';

export class StorageFilterRepository implements FilterRepository {
  constructor(private readonly store: KeyValueStore) {}

  async load(platformId: PlatformId): Promise<readonly FilterRule[]> {
    const state = migrate(await this.store.read(STORAGE_KEY));
    const entry = state.platforms[platformId];
    const persisted = Array.isArray(entry?.rules) ? entry.rules : [];
    return persisted
      .map((p) => toDomain(platformId, p))
      .filter((rule): rule is FilterRule => rule !== null);
  }

  async save(platformId: PlatformId, rules: readonly FilterRule[]): Promise<void> {
    const state = migrate(await this.store.read(STORAGE_KEY));
    state.platforms[platformId] = { rules: rules.map(toPersisted) };
    await this.store.write(STORAGE_KEY, state);
  }
}

function toPersisted(rule: FilterRule): PersistedRuleV1 {
  return { authorId: rule.authorId, mode: rule.mode, until: rule.until, createdAt: rule.createdAt };
}

function toDomain(platformId: PlatformId, p: unknown): FilterRule | null {
  if (typeof p !== 'object' || p === null) return null;
  const r = p as Record<string, unknown>;
  if (typeof r.authorId !== 'string' || r.authorId.length === 0) return null;
  if (!isHideMode(r.mode)) return null;
  if (!(r.until === null || typeof r.until === 'number')) return null;
  if (typeof r.createdAt !== 'number') return null;
  return { platformId, authorId: AuthorId(r.authorId), mode: r.mode, until: r.until, createdAt: r.createdAt };
}