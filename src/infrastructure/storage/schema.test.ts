import { describe, expect, it } from 'vitest';
import { migrate } from './schema';

const empty = { schemaVersion: 1, platforms: {} };

describe('migrate', () => {
  it('undefined => estado vacio', () => {
    expect(migrate(undefined)).toEqual(empty);
  });

  it('basura => estado vacio', () => {
    expect(migrate(42)).toEqual(empty);
    expect(migrate('x')).toEqual(empty);
    expect(migrate({ foo: 'bar' })).toEqual(empty);
    expect(migrate({ schemaVersion: 99, platforms: {} })).toEqual(empty);
  });

  it('estado v1 valido se conserva', () => {
    const state = { schemaVersion: 1, platforms: { 'whatsapp-web': { rules: [] } } };
    expect(migrate(state)).toEqual(state);
  });
});