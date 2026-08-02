import { defineConfig, globalIgnores } from 'eslint/config';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist', 'eslint.config.js']),
  {
    files: ['**/*.{js,ts,vue}'],
    extends: [
      tseslint.configs.recommended,
    ],
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
    },
  },
  {
    files: ['**/*.vue'],
    extends: [pluginVue.configs['flat/recommended']],
    rules: {
      'no-useless-assignment': 0,
      'vue/singleline-html-element-content-newline': 0,
      'vue/html-self-closing': 0,
    },
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  {
    files: ['src/views/*.vue'],
    rules: {
      'vue/multi-word-component-names': 0,
    },
  },
]);
