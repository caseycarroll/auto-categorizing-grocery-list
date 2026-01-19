// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';

import db from '@astrojs/db';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), db()],
  adapter: cloudflare()
});