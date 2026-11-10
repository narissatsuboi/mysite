/**
 * Build-time OG image endpoint. getStaticPaths mirrors every real route in
 * the site 1:1, so BaseLayout.astro can default `ogImage` to `/og${path}.png`
 * for any page without each page needing to compute or pass one itself.
 */

import type { APIRoute, GetStaticPaths } from 'astro';
import { getConfig } from '@/utils/config';
import {
  getAllPosts,
  getAllPages,
  getAllTalks,
  getAllTags,
  getPostSlugPath,
  getPageSlugPath,
} from '@/utils/content';
import { renderOgImage } from '@/utils/og-image';

export const prerender = true;

interface CardProps {
  eyebrow: string;
  title:   string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const siteConfig = await getConfig();
  const [allPosts, allPages, allTalks, allTags] = await Promise.all([
    getAllPosts(),
    getAllPages(),
    getAllTalks(),
    getAllTags(),
  ]);

  const entries: { params: { path: string }; props: CardProps }[] = [];

  const add = (path: string, props: CardProps) => {
    entries.push({ params: { path }, props });
  };

  // ── Fixed routes ────────────────────────────────────────────────────────
  add('home', { eyebrow: siteConfig.tagline ?? siteConfig.title, title: siteConfig.title });
  add('blog', { eyebrow: siteConfig.title, title: 'Blog' });
  add('talks', { eyebrow: siteConfig.title, title: 'Talks' });

  // ── Posts ───────────────────────────────────────────────────────────────
  for (const post of allPosts) {
    add(`blog/${getPostSlugPath(post.id, post.filePath)}`, {
      eyebrow: post.data.category ?? 'Post',
      title:   post.data.title,
    });
  }

  // ── Talks ───────────────────────────────────────────────────────────────
  for (const talk of allTalks) {
    add(`talks/${talk.id}`, { eyebrow: 'Talk', title: talk.data.title });
  }

  // ── Tags ────────────────────────────────────────────────────────────────
  for (const { tag, slug } of allTags) {
    add(`tags/${slug}`, { eyebrow: 'Tag', title: `#${tag}` });
  }

  // ── Pages ───────────────────────────────────────────────────────────────
  for (const page of allPages) {
    add(getPageSlugPath(page.id, page.filePath), {
      eyebrow: 'Page',
      title:   page.data.title,
    });
  }

  return entries;
};

export const GET: APIRoute = async ({ props }) => {
  const siteConfig = await getConfig();
  const { eyebrow, title } = props as CardProps;

  const png = await renderOgImage({ eyebrow, title, site: siteConfig.title });

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
};
