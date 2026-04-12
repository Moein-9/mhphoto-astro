// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import fs from 'node:fs';
import path from 'node:path';

// Build a slug → publishDate map from blog markdown frontmatter
const blogDateMap = /** @type {Record<string, string>} */ ({});
const blogDir = path.resolve('src/content/blog');
if (fs.existsSync(blogDir)) {
  for (const file of fs.readdirSync(blogDir)) {
    if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;
    const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
    const slugMatch = content.match(/^slug:\s*["']?([^"'\n]+)["']?\s*$/m);
    const dateMatch = content.match(/^publishDate:\s*["']?([^"'\n]+)["']?\s*$/m);
    if (slugMatch && dateMatch) {
      blogDateMap[slugMatch[1].trim()] = dateMatch[1].trim();
    }
  }
}

export default defineConfig({
  site: 'https://mhphoto.ca',
  trailingSlash: 'always',
  redirects: {
    '/multidaypacakge/': { status: 301, destination: '/multiday-packages/' },
    '/planning-punjabi-wedding-edmonton-guide/': { status: 301, destination: '/blog/planning-punjabi-wedding-edmonton-guide/' },
    '/indian-wedding-photography-edmonton-complete-guide/': { status: 301, destination: '/blog/indian-wedding-photography-edmonton-complete-guide/' },
    '/6-remarkable-benefits-of-hiring-indian-wedding-photographers-in-edmonton/': { status: 301, destination: '/blog/6-remarkable-benefits-of-hiring-indian-wedding-photographers-in-edmonton/' },
    '/things-you-should-know-about-wedding-photographer-in-edmonton/': { status: 301, destination: '/blog/things-you-should-know-about-wedding-photographer-in-edmonton/' },
    '/10-great-wedding-venues-in-edmonton/': { status: 301, destination: '/blog/10-great-wedding-venues-in-edmonton/' },
    '/tips-on-hiring-the-perfect-wedding-photographer/': { status: 301, destination: '/blog/tips-on-hiring-the-perfect-wedding-photographer/' },
    '/elspeth-and-prams-indian-wedding-in-edmonton-ab-ca/': { status: 301, destination: '/blog/elspeth-and-prams-indian-wedding-in-edmonton-ab-ca/' },
    '/essential-things-to-do-on-a-wedding-day/': { status: 301, destination: '/blog/essential-things-to-do-on-a-wedding-day/' },
    '/ideas-for-memorable-wedding-photography/': { status: 301, destination: '/blog/ideas-for-memorable-wedding-photography/' },
    '/appealing-wedding-day-ideas-for-introverts/': { status: 301, destination: '/blog/appealing-wedding-day-ideas-for-introverts/' },
    '/latest-trends-for-an-awesome-wedding/': { status: 301, destination: '/blog/latest-trends-for-an-awesome-wedding/' },
    '/wedding-tasks-for-family-and-friends/': { status: 301, destination: '/blog/wedding-tasks-for-family-and-friends/' },
    '/things-not-to-ask-a-wedding-photographer/': { status: 301, destination: '/blog/things-not-to-ask-a-wedding-photographer/' },
    '/why-wedding-photography-is-important/': { status: 301, destination: '/blog/why-wedding-photography-is-important/' },
    '/vantana-and-keith-wedding-in-jasper-alberta-photos-and-video/': { status: 301, destination: '/blog/vantana-and-keith-wedding-in-jasper-alberta-photos-and-video/' },
    '/gill-family-session-edmonton-river-valley-park/': { status: 301, destination: '/blog/gill-family-session-edmonton-river-valley-park/' },
    '/video-tylerleah-emotional-countryside-wedding-videography-edmonton-ab/': { status: 301, destination: '/blog/video-tylerleah-emotional-countryside-wedding-videography-edmonton-ab/' },
    '/jamal-mehrsa-vancouver-bc-wedding/': { status: 301, destination: '/blog/jamal-mehrsa-vancouver-bc-wedding/' },
    '/baby-girl-luaedmonton-newborn-pictures/': { status: 301, destination: '/blog/baby-girl-luaedmonton-newborn-pictures/' },
    '/mercy-and-martin-engagement-session-in-edmonton/': { status: 301, destination: '/blog/mercy-and-martin-engagement-session-in-edmonton/' },
    '/andrew-caitlian-edmonton-engagement-session/': { status: 301, destination: '/blog/andrew-caitlian-edmonton-engagement-session/' },
    '/masoud-kim-married-valley-ridge-golf-club/': { status: 301, destination: '/blog/masoud-kim-married-valley-ridge-golf-club/' },
    '/fall-session-highlight-pictures/': { status: 301, destination: '/blog/fall-session-highlight-pictures/' },
    '/fall/': { status: 301, destination: '/blog/fall/' },
    '/melissa-cory-leduc-stone-barn-wedding/': { status: 301, destination: '/blog/melissa-cory-leduc-stone-barn-wedding/' },
    '/kris-sarah-married/': { status: 301, destination: '/blog/kris-sarah-married/' },
    '/navid-ceilidh-maternity-photo-session/': { status: 301, destination: '/blog/navid-ceilidh-maternity-photo-session/' },
    '/vahid-tracey-engaged/': { status: 301, destination: '/blog/vahid-tracey-engaged/' },
    '/edmonton-indian-sikh-wedding-photographer-andy-and-rami-wedding/': { status: 301, destination: '/blog/edmonton-indian-sikh-wedding-photographer-andy-and-rami-wedding/' },
    '/nur-nicholas-engagement-session/': { status: 301, destination: '/blog/nur-nicholas-engagement-session/' },
    '/242/': { status: 301, destination: '/blog/242/' },
    '/britney-gregory-wedding-teaser/': { status: 301, destination: '/blog/britney-gregory-wedding-teaser/' },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap({
    filter: (page) => !page.includes('wedding-packages') && !page.includes('multiday-packages'),
    customSitemaps: ['https://mhphoto.ca/sitemap-images.xml'],
    changefreq: 'weekly',
    priority: 0.5,
    serialize(item) {
      const url = item.url;
      // Homepage
      if (url === 'https://mhphoto.ca/' || url === 'https://mhphoto.ca') {
        item.changefreq = 'weekly';
        item.priority = 1.0;
      }
      // Service pages: photography index, videography, pricing
      else if (
        (url.includes('/photography/') && !url.includes('/photography/weddings') && !url.includes('/photography/indian-weddings') && !url.includes('/photography/engagement') && !url.includes('/photography/family')) ||
        url.includes('/videography') ||
        url.includes('/pricing') ||
        url.includes('/wedding-photo-video-packages-edmonton') ||
        url.includes('/elopement-photographer-edmonton') ||
        url.includes('/affordable-wedding-photographer-edmonton') ||
        url.includes('/indian-wedding-videographer-edmonton')
      ) {
        item.changefreq = 'weekly';
        item.priority = 0.8;
      }
      // Gallery pages
      else if (
        url.includes('/photography/weddings') ||
        url.includes('/photography/indian-weddings') ||
        url.includes('/photography/engagement') ||
        url.includes('/photography/family')
      ) {
        item.changefreq = 'monthly';
        item.priority = 0.6;
      }
      // Blog listing
      else if (url.match(/\/blog\/?$/) || url === 'https://mhphoto.ca/blog/') {
        item.changefreq = 'weekly';
        item.priority = 0.8;
      }
      // Blog posts — add lastmod from publishDate
      else if (url.includes('/blog/')) {
        item.changefreq = 'monthly';
        item.priority = 0.7;
        // Extract slug from URL: https://mhphoto.ca/blog/some-slug/ → some-slug
        const slug = url.replace('https://mhphoto.ca/blog/', '').replace(/\/$/, '');
        const pubDate = blogDateMap[slug];
        if (pubDate) {
          item.lastmod = new Date(pubDate).toISOString().split('T')[0];
        }
      }
      // About, contact
      else if (url.includes('/about') || url.includes('/contact')) {
        item.changefreq = 'monthly';
        item.priority = 0.6;
      }
      return item;
    },
  }), mdx()],
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
});
