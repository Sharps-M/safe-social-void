export interface KeyValueStore {
  read<T>(key: string): Promise<T | undefined>;
  write(key: string, value: unknown): Promise<void>;
}

/**
 * Forma mínima de la que dependemos de la storage area (solo get/set).
 * Tanto `browser.storage.local` como el fakeBrowser de los tests la satisfacen.
 */
export interface StorageArea {
  get(key: string): Promise<Record<string, unknown>>;
  set(items: Record<string, unknown>): Promise<void>;
}

/**
 * Implementación concreta sobre la storage area del navegador.
 * En producción recibe `browser.storage.local`; en tests, `fakeBrowser.storage.local`.
 */
export class BrowserKeyValueStore implements KeyValueStore {
  constructor(private readonly area: StorageArea) {}

  async read<T>(key: string): Promise<T | undefined> {
    const result = await this.area.get(key);
    return result[key] as T | undefined;
  }

  async write(key: string, value: unknown): Promise<void> {
    await this.area.set({ [key]: value });
  }
}