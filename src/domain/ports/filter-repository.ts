import type { FilterRule } from '../entities/filter-rule';
import type { PlatformId } from '../value-objects/platform-id';

/**
 * Puerto de persistencia (patron Repository). La implementacion concreta vivira en
 * `infrastructure` sobre `browser.storage.local`. El dominio solo conoce esta interfaz.
 */
export interface FilterRepository {
  load(platformId: PlatformId): Promise<readonly FilterRule[]>;
  save(platformId: PlatformId, rules: readonly FilterRule[]): Promise<void>;
}
