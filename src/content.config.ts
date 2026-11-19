import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { courses } from './data/courses';

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    course: z.enum(courses.map(course => course.id) as [string, ...string[]]),
    lesson: z.string(),
    order: z.number(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    topics: z.array(z.string())
  })
});

export const collections = { notes };
