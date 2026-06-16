import type { HideMode, PlatformId } from '@/domain';

export const STORAGE_KEY = 'ssv:state';
export const CURRENT_SCHEMA_VERSION = 1 as const;

export interface PersistedRuleV1 {
  authorId: string;
  mode: HideMode;
  until: number | null;
  createdAt: number;
}

export interface PersistedStateV1 {
  schemaVersion: 1;
  platforms: Partial<Record<PlatformId, { rules: PersistedRuleV1[] }>>;
}

function emptyState(): PersistedStateV1 {
  return { schemaVersion: CURRENT_SCHEMA_VERSION, platforms: {} };
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function migrate(raw: unknown): PersistedStateV1 {
  if (!isObject(raw)) return emptyState();
  if (raw.schemaVersion !== CURRENT_SCHEMA_VERSION) return emptyState();
  if (!isObject(raw.platforms)) return emptyState();
  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    platforms: raw.platforms as PersistedStateV1['platforms'],
  };
}