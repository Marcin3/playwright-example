import playwright from 'eslint-plugin-playwright';
import tseslint from 'typescript-eslint';

const flatRecommendedConfig = playwright.configs['flat/recommended'];

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    ...flatRecommendedConfig,
    rules: {
      ...flatRecommendedConfig.rules,
      'playwright/expect-expect': [
        'error',
        {
          assertFunctionPatterns: ['^check.*', '^verify.*'],
        },
      ],
    },
  },
  {
    ignores: ['.idea', '.vscode', 'playwright-report', 'node_modules', 'test-results', 'eslint.config.mjs'],
  },
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },

    rules: {
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'classProperty',
          filter: { regex: '^([A-Z0-9_]+)$', match: false },
          format: null,
          leadingUnderscore: 'require',
        },
      ],
    },
  },
];
