import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import tina from '@tinacms/astro/integration';
import { tinaAdminDevRedirect } from '@tinacms/astro/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
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
