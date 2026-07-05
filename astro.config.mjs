import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import posterIntegration from './src/integrations/poster-downloader';

// https://astro.build/config
export default defineConfig({
  integrations: [posterIntegration()],
  vite: {
    plugins: [tailwindcss()],
  },
});
