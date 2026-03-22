import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
  }),
});

const work = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    url: z.string().url().optional(),
    tags: z.array(z.string()).optional(),
    role: z.string().optional(),
  }),
});

export const collections = { blog, work };
