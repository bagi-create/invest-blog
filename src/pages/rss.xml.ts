import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, plainText } from '../lib/microcms';
import { SITE } from '../config';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site!,
    items: posts.slice(0, 30).map((p) => ({
      title: p.title,
      description: p.description || plainText(p.content),
      pubDate: new Date(p.publishedAt),
      link: `/posts/${p.id}/`,
      categories: p.category ? [p.category.name] : [],
    })),
    customData: '<language>ja</language>',
  });
}
