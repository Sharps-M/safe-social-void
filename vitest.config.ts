import { defineConfig } from 'vitest/config';

// Por defecto entorno `node`: domain y application se testean puros, sin browser.
// Los tests de adapters que toquen DOM declaran `// @vitest-environment jsdom` por archivo.
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts', 'tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/domain/**', 'src/application/**'],
      thresholds: { lines: 90, functions: 90, branches: 85, statements: 90 },
    },
  },
});
