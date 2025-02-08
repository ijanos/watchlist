import js from "@eslint/js";
import eslintPluginAstro from 'eslint-plugin-astro';

export default [
  {
    ignores: ['dist/**', '.astro/**']
  },
  js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
];
