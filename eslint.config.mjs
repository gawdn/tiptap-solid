import { defineConfig, globalIgnores } from 'eslint/config'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import noOnlyTests from 'eslint-plugin-no-only-tests'
import eslintComments from 'eslint-plugin-eslint-comments'
import tsParser from '@typescript-eslint/parser'
import { fileURLToPath } from 'url'
import path from 'path'
export default defineConfig([
  globalIgnores([
    '**/node_modules',
    '**/dist',
    '**/dev',
    '**/tsup.config.ts',
    '**/vitest.config.ts',
  ]),
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'no-only-tests': noOnlyTests,
      'eslint-comments': eslintComments,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'module',

      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: path.dirname(fileURLToPath(import.meta.url)),
      },
    },

    rules: {
      'prefer-const': 'warn',
      'no-console': 'warn',
      'no-debugger': 'warn',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/no-useless-empty-export': 'warn',
      'no-only-tests/no-only-tests': 'warn',
      'eslint-comments/no-unused-disable': 'warn',
    },
  },
])
