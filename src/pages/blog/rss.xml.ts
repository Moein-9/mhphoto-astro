import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const now = new Date();
  const allPosts = await getCollection('blog', ({ data }) => {
    if (data.draft) return false;
    const pubDate = new Date(data.publishDate || data.date);
    return pubDate <= now;
  });

  // Sort newest first
  const posts = allPosts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return rss({
    title: 'MH Photography Blog — Edmonton Wedding Photography',
    description:
      'Wedding photography tips, Indian wedding guides, and Edmonton venue spotlights from MH Photography',
    site: context.site!.toString(),
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.publishDate || post.data.date),
      description: post.data.description || '',
      link: `/blog/${post.data.slug}/`,
    })),
    customData: '<language>en-CA</language>',
    trailingSlash: true,
  });
}
