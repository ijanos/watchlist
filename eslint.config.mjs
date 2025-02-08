import js from "@eslint/js";
import ts from 'typescript-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';

export default [
  {
    ignores: ['dist/**', '.astro/**', "src/env.d.ts"]
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
];
