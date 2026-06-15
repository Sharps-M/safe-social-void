import type { Message } from '../entities/message';
import { isRuleActive, type FilterRule } from '../entities/filter-rule';
import type { HideMode } from '../value-objects/hide-mode';

/** Resultado de evaluar un mensaje contra las reglas. */
export type FilterDecision =
  | { readonly action: 'show' }
  | { readonly action: 'hide'; readonly mode: HideMode };

const SHOW: FilterDecision = { action: 'show' };

/**
 * Decide si un mensaje debe ocultarse. Funcion PURA: mismas entradas => misma salida.
 * - `rules` se asume ya acotado a la plataforma activa.
 * - `now` se inyecta (no usa Date.now) para que sea 100% deterministico y testeable.
 */
export function evaluate(
  message: Message,
  rules: readonly FilterRule[],
  now: number,
): FilterDecision {
  for (const rule of rules) {
    if (rule.authorId === message.authorId && isRuleActive(rule, now)) {
      return { action: 'hide', mode: rule.mode };
    }
  }
  return SHOW;
}
