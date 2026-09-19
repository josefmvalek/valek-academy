import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import tina from '@tinacms/astro/integration';
import { tinaAdminDevRedirect } from '@tinacms/astro/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://valekacademy.cz',
  output: 'server',
  adapter: vercel(),
  redirects: {
    '/rozpis-hodin': '/rozvrh',
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    tina(),
  ],
  vite: {
    plugins: [tinaAdminDevRedirect()],
  },
});
