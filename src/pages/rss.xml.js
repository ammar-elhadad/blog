import rss from '@astrojs/rss';
import { SITE } from '../consts';
import { getAllPosts } from '../posts';
import { href } from '../utils';

export async function GET(context) {
  const posts = await getAllPosts();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description ?? '',
      pubDate: p.data.pubDate,
      link: href(p.url),
      categories: p.data.tags ?? [],
    })),
  });
}
