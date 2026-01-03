import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://ezhou89.github.io',
  base: '/test-kitchen/',
  integrations: [mdx()],
  content: {
    collections: {
      protocols: '../01_protocols/**/*.md',
      runs: '../02_runs/**/*.md',
      series: '../03_series/**/*.md',
      dishes: '../06_dishes/**/*.md',
      menus: '../07_menus/**/*.md',
      plans: '../08_meal-plans/**/*.md',
      manual: '../00_lab-manual/**/*.md',
    }
  }
});
