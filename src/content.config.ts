import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Fields shared by every post type.
const base = {
  title: z.string(),
  description: z.string().optional(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
};

const htb = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/htb' }),
  schema: z.object({
    ...base,
    machine: z.string(),
    os: z.enum(['Linux', 'Windows', 'Other']).default('Linux'),
    difficulty: z.enum(['Easy', 'Medium', 'Hard', 'Insane']),
    platform: z.string().default('Hack The Box'),
    techniques: z.array(z.string()).default([]),
    retired: z.boolean().default(false),
  }),
});

const ctf = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/ctf' }),
  schema: z.object({
    ...base,
    event: z.string(),
    category: z.enum([
      'web', 'pwn', 'crypto', 'forensics', 'rev', 'misc', 'osint', 'mobile',
    ]),
    difficulty: z.enum(['Easy', 'Medium', 'Hard', 'Insane']).optional(),
    points: z.number().optional(),
    team: z.string().optional(),
  }),
});

const cve = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/cve' }),
  schema: z.object({
    ...base,
    cveId: z.string(),
    cvss: z.number().min(0).max(10),
    severity: z.enum(['Low', 'Medium', 'High', 'Critical']),
    affectedProduct: z.string(),
    vulnType: z.string(),
    disclosureDate: z.coerce.date().optional(),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    ...base,
    topic: z.string().optional(),
  }),
});

export const collections = { htb, ctf, cve, notes };
