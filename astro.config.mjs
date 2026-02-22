import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import posterIntegration from './src/integrations/poster-downloader';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [posterIntegration(), react()],

  vite: {
    plugins: [tailwindcss()],
  },
});