import { defineCollection } from 'astro:content';
import { z } from "astro/zod";
import { glob, file } from 'astro/loaders';
import { ratingCriteria, ratingMax } from './ratings';

export const POSTS_PATH = "src/content/posts/";
export const PAGES_PATH = "src/content/pages/";
export const NOTES_PATH = "src/content/notes/";

function removeDupsAndLowerCase(array: string[]) {
	if (!array.length) return array;
	const lowercaseItems = array.map((str) => str.toLowerCase());
	const distinctItems = new Set(lowercaseItems);
	return Array.from(distinctItems);
}


const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title:   z.string(),
    posted:  z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    lang:    z.string().optional(),
  }),
});

// Author-defined extension point — Patrika assigns no meaning to any key
// inside `meta`. See site.config.ts's `browse.indexes` for how a key
// becomes a browsable dimension.
const metaSchema = z.record(z.string(), z.union([z.string(), z.array(z.string())])).optional();

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    published:   z.coerce.date(),
    updated:     z.coerce.date().optional(),
    category:    z.string().optional().default('Travels'),
    tags:        z.array(z.string()).transform(removeDupsAndLowerCase).optional(),
    cover:       z.string().optional(),
    featured:    z.boolean().default(false),
    draft:       z.boolean().default(false),
    lang:        z.string().optional(),
    series:      z.string().optional(),
    seriesOrder: z.number().int().positive().optional(),
    meta:        metaSchema,
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    title:       z.string(),
    description: z.string().optional(),
    published:   z.coerce.date(),
    updated:     z.coerce.date().optional(),
    draft:       z.boolean().default(false),
    category:    z.string().optional(),
    color:       z.string().optional(),
    tags:      z.array(z.string()).transform(removeDupsAndLowerCase).optional(),
    lang:      z.string().optional(),
    meta:      metaSchema,
  }),
});

const ratingEntry = z.object({
  score: z.number().int().min(1).max(ratingMax),
  note:  z.string().optional(),
}).optional();

const ratingsSchema = z
  .object(Object.fromEntries(ratingCriteria.map((c) => [c.key, ratingEntry])))
  .default({});

const talks = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/talks' }),
  schema: ({ image }) => z.object({
    title:       z.string(),
    description: z.string(),
    date:        z.coerce.date(),
    event:       z.string(),
    eventUrl:    z.string().url().optional(),
    rsvpUrl:     z.string().url().optional(),
    location:    z.string().optional(),
    cover:       image().optional(),
    // 'contain' shows the cover uncropped (for slides and diagrams)
    coverFit:    z.enum(['cover', 'contain']).default('cover'),
    photos:      z.array(z.object({
      image:   image(),
      alt:     z.string(),
      caption: z.string().optional(),
    })).default([]),
    slides:      z.string().url().optional(),
    // Path to a PDF under /public, e.g. /slides/my-talk.pdf, shown in an embedded viewer
    slidesPdf:   z.string().startsWith('/').endsWith('.pdf').optional(),
    video:       z.string().url().optional(),
    repos:       z.array(z.object({
      title:       z.string(),
      url:         z.string().url(),
      description: z.string().optional(),
    })).default([]),
    // Your own Self Rating of the talk. Criteria are defined in src/ratings.ts
    ratings:     ratingsSchema,
    // People to thank by name, e.g. the meetup organizers
    thanks:      z.array(z.object({
      name: z.string(),
      role: z.string().optional(),
      url:  z.string().url().optional(),
      note: z.string().optional(),
    })).default([]),
    related:     z.array(z.object({
      title: z.string(),
      url:   z.string().optional(),
      note:  z.string().optional(),
    })).default([]),
    draft:       z.boolean().default(false),
  }),
});

// ── siteConfig ────────────────────────────────────────────────────────────────
const siteConfig = defineCollection({
  loader: file('src/content/siteConfig/config.yaml'),
  schema: z.object({
    title:       z.string().optional(),
    description: z.string().optional(),
    url:         z.string().optional(),
    locale:      z.string().optional(),
    author:      z.object({
      name:    z.string(),
      bio:     z.string().optional(),
      url:     z.string().optional(),
      avatar:  z.string().optional(),
    }).optional(),
    logo:       z.string().optional(),
    ogImage:    z.string().optional(),
    navigation: z.array(z.object({
      title: z.string(),
      url:   z.string(),
    })).optional(),
    footerLinks: z.array(z.object({
      title: z.string(),
      url:   z.string(),
    })).optional(),
    social: z.array(z.object({
      title: z.string(),
      url:   z.string(),
      icon:  z.enum(['github', 'linkedin', 'mastodon', 'twitter', 'rss', 'email']).optional(),
    })).optional(),
    heroText:       z.string().optional(),
    notebookQuote:  z.string().optional(),
    footerCredits:  z.string().optional(),
    postsPerPage:   z.number().optional(),
    recentPosts:    z.number().optional(),
    showLogo:       z.boolean().optional(),
    browse: z.object({
      years:   z.boolean().optional(),
      indexes: z.array(z.object({
        key:   z.string(),
        title: z.string(),
        slug:  z.string(),
      })).optional(),
    }).optional(),
  }),
})

export const collections = { pages, posts, notes, talks, siteConfig };
