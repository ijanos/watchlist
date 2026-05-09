import { defineConfig } from 'astro/config';

import posterIntegration from './src/integrations/poster-downloader';

// https://astro.build/config
export default defineConfig({
  integrations: [posterIntegration()],
});
