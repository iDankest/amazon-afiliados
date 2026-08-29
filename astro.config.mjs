import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { isNoIndexPath } from './src/lib/seo';

// GitHub Pages (proyecto): https://idankest.github.io/orza/
export default defineConfig({
  site: 'https://idankest.github.io',
  base: '/orza',
  integrations: [
    sitemap({
      filter: (page) => !isNoIndexPath(page),
    }),
  ],
});
