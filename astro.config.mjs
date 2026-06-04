// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// ──────────────────────────────────────────────────────────────────────────
// GitHub Pages config — CHANGE THESE for your repo:
//   • User/Org site (repo named "<user>.github.io"):
//       site: 'https://<user>.github.io',  base: '/'
//   • Project site (any other repo name):
//       site: 'https://<user>.github.io',  base: '/<repo-name>/'
// The deploy workflow + the SITE/BASE below must agree. See README.md.
// ──────────────────────────────────────────────────────────────────────────
const SITE = 'https://your-username.github.io';
const BASE = '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      // Warm, minimal dark theme that pairs with the crimson palette.
      theme: 'vesper',
      wrap: false,
    },
  },
});
