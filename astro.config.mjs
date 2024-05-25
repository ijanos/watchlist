import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import posterIntegration from './src/integrations/poster-downloader';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    posterIntegration(),
  ],
});
