import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['.wxt/**', '.output/**', 'dist/**', 'coverage/**', 'node_modules/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
  },
  // Regla de arquitectura (Dependency Rule): el nucleo no conoce infraestructura,
  // UI ni APIs del navegador. Si esto rompe, el acoplamiento esta mal.
  {
    files: ['src/domain/**/*.ts', 'src/application/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/infrastructure/*', '@/ui/*', '@/entrypoints/*', 'wxt', 'wxt/*'],
              message:
                'El nucleo (domain/application) no debe depender de infraestructura, UI ni del browser.',
            },
          ],
        },
      ],
    },
  },
);
