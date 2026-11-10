import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getAllPosts, getPostUrl } from "@/utils/content";
import { getConfig } from "@/utils/config";

export async function GET(context: APIContext) {
  const siteConfig = await getConfig();
  const posts = await getAllPosts();

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.published,
      link: getPostUrl(post.id, post.filePath),
      categories: [post.data.category ?? "Post"],
    })),
  });
}
