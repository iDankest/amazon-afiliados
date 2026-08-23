import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages (proyecto): https://idankest.github.io/amazon-afiliados/
export default defineConfig({
  site: 'https://idankest.github.io',
  base: '/amazon-afiliados',
  integrations: [sitemap()],
});
