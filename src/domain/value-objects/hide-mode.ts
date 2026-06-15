/** Como se renderiza localmente el contenido filtrado. */
export const HIDE_MODES = ['hidden', 'placeholder', 'blurred'] as const;
export type HideMode = (typeof HIDE_MODES)[number];

export const isHideMode = (value: unknown): value is HideMode =>
  typeof value === 'string' && (HIDE_MODES as readonly string[]).includes(value);
