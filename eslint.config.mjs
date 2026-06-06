import js from "@eslint/js";
import eslintPluginAstro from 'eslint-plugin-astro';
import ts from 'typescript-eslint';

export default [
  {
    ignores: ['dist/**', '.astro/**', "src/env.d.ts"]
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
];
