import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.string(),
    publishDate: z.string().optional(),
    category: z.string(),
    description: z.string(),
    image: z.string().optional(),
    keyword: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
