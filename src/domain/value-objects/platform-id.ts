/** Plataformas soportadas. Se agrega un literal por cada adapter nuevo. */
export const PLATFORM_IDS = ['whatsapp-web'] as const;
export type PlatformId = (typeof PLATFORM_IDS)[number];

export const isPlatformId = (value: unknown): value is PlatformId =>
  typeof value === 'string' && (PLATFORM_IDS as readonly string[]).includes(value);
