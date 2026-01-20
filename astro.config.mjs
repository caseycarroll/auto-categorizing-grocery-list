// @ts-check
import { defineConfig } from 'astro/config';
import { visualizer } from "rollup-plugin-visualizer";

import vue from '@astrojs/vue';

import db from '@astrojs/db';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), db()],
  adapter: netlify(),
  vite: {
    plugins: [visualizer({
        emitFile: true,
        filename: "stats.html",
    })]
  }
});