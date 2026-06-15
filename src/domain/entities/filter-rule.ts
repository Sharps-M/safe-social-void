import type { AuthorId } from '../value-objects/ids';
import type { HideMode } from '../value-objects/hide-mode';
import type { PlatformId } from '../value-objects/platform-id';

/**
 * Regla de filtrado: "ocultar al autor X en la plataforma P, con modo M, hasta T".
 * `until = null` => permanente. Un timestamp (epoch ms) => filtro temporal que se auto-expira.
 */
export interface FilterRule {
  readonly platformId: PlatformId;
  readonly authorId: AuthorId;
  readonly mode: HideMode;
  readonly until: number | null;
  readonly createdAt: number;
}

/** Una regla esta activa si es permanente o si su vencimiento todavia no paso. */
export function isRuleActive(rule: FilterRule, now: number): boolean {
  return rule.until === null || rule.until > now;
}

export interface CreateFilterRuleInput {
  readonly platformId: PlatformId;
  readonly authorId: AuthorId;
  readonly mode: HideMode;
  readonly until?: number | null;
  readonly now: number;
}

/** Fabrica una regla con `createdAt` ya seteado. `until` opcional => permanente. */
export function createFilterRule(input: CreateFilterRuleInput): FilterRule {
  return {
    platformId: input.platformId,
    authorId: input.authorId,
    mode: input.mode,
    until: input.until ?? null,
    createdAt: input.now,
  };
}
