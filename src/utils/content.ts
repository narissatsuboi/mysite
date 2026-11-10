import { getCollection, type CollectionEntry } from "astro:content";
import { getAssetPath } from "./url";
import { slugify } from "./text";

import { POSTS_PATH, PAGES_PATH } from "../content.config";
export type Post = CollectionEntry<"posts">;
export type Page = CollectionEntry<"pages">;

export type AnyEntry = {
  id: string;
  published: Date;
  title: string;
  href: string;
  collection: 'posts';
  category?: string;
  tags?: string[];
  color?: string;
};

export type AnyCollectionEntry = Post;

let postsCache: Post[] | null = null;
let pagesCache: Page[] | null = null;

function isVisiblePost(post: Post): boolean {
  // Show everything in development
  if (import.meta.env.DEV) {
    return true;
  }

  const isDraft = post.data.draft;

  const isFuturePost =
    new Date(post.data.published).getTime() >
    Date.now();

  return !isDraft && !isFuturePost;
}

function sortPosts(posts: Post[]): Post[] {
  return posts.sort((a, b) => {
    const aDate = new Date(
      a.data.updated ?? a.data.published
    ).getTime();

    const bDate = new Date(
      b.data.updated ?? b.data.published
    ).getTime();

    return bDate - aDate;
  });
}

export async function getAllPosts(): Promise<Post[]> {
  if (postsCache) {
    return postsCache;
  }

  const posts = await getCollection(
    "posts",
    isVisiblePost
  );

  postsCache = sortPosts(posts);

  return postsCache;
}

// ── Pages ──────────────────────────────────────────────────────────────────────

function sortPages(pages: Page[]): Page[] {
  return pages.sort((a, b) => {
    const aDate = new Date(a.data.updated ?? 0).getTime();
    const bDate = new Date(b.data.updated ?? 0).getTime();
    return bDate - aDate;
  });
}

export async function getAllPages(): Promise<Page[]> {
  if (pagesCache) {
    return pagesCache;
  }

  const pages = await getCollection("pages");

  pagesCache = sortPages(pages);

  return pagesCache;
}

/**
 * Remove hidden folders and normalize directory segments.
 *
 * Example:
 * posts/_2026/Japan Beyond Places.md
 * -> []
 *
 * posts/travel/Japan/Tokyo.md
 * -> ["travel", "japan"]
 */
export function getPostPathSegments(
  filePath?: string
): string[] {
  if (!filePath) {
    return [];
  }

  return filePath
    .replace(POSTS_PATH, "")
    .split("/")
    .filter(Boolean)
    .filter((segment) => !segment.startsWith("_"))
    .slice(0, -1)
    .map(slugify);
}

/**
 * Get the final slug segment from Astro content entry ID.
 *
 * Example:
 * "travel/tokyo-beyond-places"
 * -> "tokyo-beyond-places"
 */
export function getPostSlugSegment(id: string): string {
  const segments = id.split("/");

  return segments.at(-1) ?? id;
}

/**
 * Generate nested slug path from file structure.
 *
 * Example:
 * travel/japan/tokyo.md
 * -> "travel/japan/tokyo"
 */
export function getPostSlugPath(
  id: string,
  filePath?: string
): string {
  const segments = getPostPathSegments(filePath);

  const slug =
    slugify(getPostSlugSegment(id));

  return segments.length > 0
    ? [...segments, slug].join("/")
    : slug;
}

/**
 * Route param slug used in getStaticPaths().
 *
 * Example:
 * "/travel/japan/tokyo"
 */
export function getPostSlug(
  id: string,
  filePath?: string
): string {
  return `/${getPostSlugPath(id, filePath)}`;
}

export function getPagePathSegments(
  filePath?: string
): string[] {
  if (!filePath) {
    return [];
  }

  return filePath
    .replace(PAGES_PATH, "")
    .split("/")
    .filter(Boolean)
    .filter((segment) => !segment.startsWith("_"))
    .slice(0, -1)
    .map(slugify);
}

export function getPageSlugPath(
  id: string,
  filePath?: string
): string {
  const segments = getPagePathSegments(filePath);
  const slug = slugify(getPostSlugSegment(id));

  return segments.length > 0
    ? [...segments, slug].join("/")
    : slug;
}

export function getPageSlug(
  id: string,
  filePath?: string
): string {
  return `/${getPageSlugPath(id, filePath)}`;
}

/**
 * Full page URL — pages are served at the root (no /pages/ prefix).
 *
 * Example:
 * "about" -> "/about"
 */
export function getPageUrl(
  id: string,
  filePath?: string
): string {
  return getAssetPath(getPageSlugPath(id, filePath));
}

/**
 * Full post URL.
 *
 * Example:
 * "/posts/travel/japan/tokyo"
 */
export function getPostUrl(
  id: string,
  filePath?: string
): string {
  return getAssetPath(
    `blog/${getPostSlugPath(id, filePath)}`
  );
}

export async function getSeriesArticles(series: string) {
  const posts = await getAllPosts();
  return posts
    .filter(p => p.data.series === series)
    .sort((a, b) => (a.data.seriesOrder ?? 0) - (b.data.seriesOrder ?? 0));
}

// ── Grouping ───────────────────────────────────────────────────────────────────

export function getPostsGroupedByYear(
  entries: Post[]
): [string, Post[]][] {
  const grouped = entries.reduce<Record<string, Post[]>>((acc, entry) => {
    const year = entry.data.published.getFullYear().toString();
    (acc[year] ??= []).push(entry);
    return acc;
  }, {});

  for (const year in grouped) {
    grouped[year].sort(
      (a, b) => b.data.published.valueOf() - a.data.published.valueOf()
    );
  }

  return Object.entries(grouped).sort(
    ([a], [b]) => Number(b) - Number(a)
  );
}

// ── Talks ──────────────────────────────────────────────────────────────────────

export type Talk = CollectionEntry<"talks">;

export async function getAllTalks(): Promise<Talk[]> {
  const talks = await getCollection("talks", (t) =>
    import.meta.env.DEV ? true : !t.data.draft
  );

  return talks.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/**
 * A talk is upcoming from now until the end of its date. Evaluated at build
 * time, so the deploy workflow rebuilds the site daily.
 */
export function isUpcoming(talk: Talk): boolean {
  const now = new Date();
  const todayUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return talk.data.date.valueOf() >= todayUtc;
}

// ── Tags and related posts ─────────────────────────────────────────────────────

export function getTagUrl(tag: string): string {
  return getAssetPath(`tags/${slugify(tag)}`);
}

export async function getAllTags(): Promise<{ tag: string; slug: string; count: number }[]> {
  const posts = await getAllPosts();
  const counts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.data.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, slug: slugify(tag), count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/**
 * Other posts ranked by number of shared tags, then recency. Falls back to
 * the most recent posts when nothing shares a tag.
 */
export async function getRelatedPosts(post: Post, limit = 3): Promise<Post[]> {
  const tags = new Set(post.data.tags ?? []);
  const others = (await getAllPosts()).filter((p) => p.id !== post.id);

  const shared = (p: Post) => (p.data.tags ?? []).filter((t) => tags.has(t)).length;

  return others
    .map((p, i) => ({ p, score: shared(p), i }))
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .slice(0, limit)
    .map(({ p }) => p);
}


/**
 * Blog posts and talks together, newest first, for the blog list.
 */
export async function getAllFeedEntries(): Promise<(Post | Talk)[]> {
  const [posts, talks] = await Promise.all([getAllPosts(), getAllTalks()]);
  const dateOf = (e: Post | Talk) =>
    (e.collection === "talks" ? e.data.date : e.data.published).valueOf();

  // Upcoming talks have their own section on the Talks page
  const pastTalks = talks.filter((t) => !isUpcoming(t));

  return [...posts, ...pastTalks].sort((a, b) => dateOf(b) - dateOf(a));
}
