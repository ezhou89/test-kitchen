import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Schema for protocol frontmatter
const protocolSchema = z.object({
  category: z.string().optional(),
  tags: z.string().optional(),
  version: z.string().optional(),
  servings: z.string().optional(),
  yield: z.string().optional(),
  'prep time': z.string().optional(),
  'cook time': z.string().optional(),
  tools: z.string().optional(),
}).passthrough();

// Schema for run frontmatter
const runSchema = z.object({
  date: z.string().optional(),
  'protocol used': z.string().optional(),
  tags: z.string().optional(),
  tools: z.string().optional(),
  prep: z.string().optional(),
  cook: z.string().optional(),
  total: z.string().optional(),
}).passthrough();

// Generic schema for other content
const genericSchema = z.object({}).passthrough();

// Define collections that read from parent directories
export const collections = {
  protocols: defineCollection({
    loader: glob({ pattern: '**/*.md', base: '../01_protocols' }),
    schema: protocolSchema,
  }),
  runs: defineCollection({
    loader: glob({ pattern: '**/*.md', base: '../02_runs' }),
    schema: runSchema,
  }),
  series: defineCollection({
    loader: glob({ pattern: '**/*.md', base: '../03_series' }),
    schema: genericSchema,
  }),
  dishes: defineCollection({
    loader: glob({ pattern: '**/*.md', base: '../06_dishes' }),
    schema: genericSchema,
  }),
  menus: defineCollection({
    loader: glob({ pattern: '**/*.md', base: '../07_menus' }),
    schema: genericSchema,
  }),
  plans: defineCollection({
    loader: glob({ pattern: '**/*.md', base: '../08_meal-plans' }),
    schema: genericSchema,
  }),
  manual: defineCollection({
    loader: glob({ pattern: '**/*.md', base: '../00_lab-manual' }),
    schema: genericSchema,
  }),
};
