import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  js.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginPrettierRecommended,

  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: {
      js,
    },
    rules: {
      'prettier/prettier': 'warn',
    },
    languageOptions: {
      globals: globals.node,
    },
  },
  tseslint.configs.recommended,
]);
