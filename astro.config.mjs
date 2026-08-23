import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages (proyecto): https://idankest.github.io/orza/
export default defineConfig({
  site: 'https://idankest.github.io',
  base: '/orza',
  integrations: [sitemap()],
});
