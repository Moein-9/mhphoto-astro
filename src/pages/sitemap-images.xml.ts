import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

const SITE = 'https://mhphoto.ca';

interface ImageEntry {
  loc: string;
  title: string;
  caption: string;
  pageUrl: string;
}

/** Turn a filename like "008-ceremony-kiss.jpg" into "Ceremony Kiss" */
function filenameToTitle(filename: string): string {
  const name = filename.replace(/\.[^.]+$/, ''); // strip extension
  // Remove leading number prefix like "001-" or "0001-"
  const cleaned = name.replace(/^\d+-/, '');
  if (!cleaned || /^[A-Z]{2,}\d+/.test(cleaned) || /^frame/.test(cleaned) || /^Picture/i.test(cleaned) || /^DSC\d/.test(cleaned) || /^SJ-\d/.test(cleaned) || /^PM-\d/.test(cleaned) || /^MOE\d/.test(cleaned) || /^\d+$/.test(cleaned) || /^Fall-session/i.test(cleaned) || /^untitled/i.test(cleaned) || /^Screen-Shot/i.test(cleaned)) {
    return '';
  }
  return cleaned
    .replace(/[-_]+/g, ' ')
    .replace(/\(.*?\)/g, '')
    .replace(/\d+$/, '')
    .trim()
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
    .trim();
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Category-specific SEO context
const categoryMeta: Record<string, { pageUrl: string; defaultTitle: string; defaultCaption: string; keywords: string }> = {
  weddings: {
    pageUrl: `${SITE}/photography/weddings/`,
    defaultTitle: 'Edmonton Wedding Photography',
    defaultCaption: 'Wedding photography by MH Photo in Edmonton, Alberta. Professional wedding photographer capturing your special day.',
    keywords: 'Edmonton wedding photography',
  },
  'indian-weddings': {
    pageUrl: `${SITE}/photography/indian-weddings/`,
    defaultTitle: 'Indian Wedding Photography Edmonton',
    defaultCaption: 'Indian wedding photography in Edmonton by MH Photo. South Asian wedding photographer capturing traditional ceremonies, baraat, sangeet, and reception moments.',
    keywords: 'Indian wedding photographer Edmonton',
  },
  engagement: {
    pageUrl: `${SITE}/photography/engagement/`,
    defaultTitle: 'Edmonton Engagement Photography',
    defaultCaption: 'Engagement session photography in Edmonton by MH Photo. Couples portrait photographer capturing your love story.',
    keywords: 'Edmonton engagement photography',
  },
  family: {
    pageUrl: `${SITE}/photography/family/`,
    defaultTitle: 'Edmonton Family Photography',
    defaultCaption: 'Family photography sessions in Edmonton by MH Photo. Professional family photographer capturing meaningful moments.',
    keywords: 'Edmonton family photography',
  },
};

// Caption enrichment based on descriptive filenames
const captionMap: Record<string, string> = {
  'first-look': 'Emotional first look moment between bride and groom',
  'bride-getting-ready': 'Bride getting ready on her wedding day',
  'bride-portrait': 'Beautiful bridal portrait',
  'ceremony-kiss': 'The first kiss at the wedding ceremony',
  'ceremony-moment': 'Emotional moment during the wedding ceremony',
  'aisle-walk': 'Walking down the aisle',
  'bridal-prep': 'Bridal preparation and getting ready details',
  'groom-prep': 'Groom getting ready for the wedding',
  'wedding-vows': 'Exchange of wedding vows',
  'vow-exchange': 'Heartfelt vow exchange during ceremony',
  'outdoor-portrait': 'Outdoor couple portrait session',
  'ceremony-entrance': 'Grand entrance at the wedding ceremony',
  'first-dance': 'The couple\'s first dance at the reception',
  'reception-speech': 'Touching speech during the wedding reception',
  'ring-exchange': 'Wedding ring exchange ceremony',
  'reception-emotion': 'Emotional moment during the reception',
  'sunset-couple': 'Golden hour sunset couple portrait',
  'father-daughter': 'Father-daughter dance at the wedding reception',
  'family-blessing': 'Family blessing moment at the wedding',
  'couple-portrait-outdoor': 'Outdoor portrait of the newlywed couple',
  'dance-floor': 'Wedding reception dance floor celebration',
  'guest-reaction': 'Candid guest reactions during the wedding',
  'couple-candid': 'Candid moment between the couple',
  'bridal-detail': 'Wedding bridal detail shot',
  'bouquet-detail': 'Wedding bouquet floral detail',
  'couple-intimate': 'Intimate couple portrait',
  'wedding-party': 'Wedding party group photo',
  'ceremony-emotion': 'Emotional ceremony moment',
  'golden-hour-couple': 'Golden hour couple portrait session',
  'reception-dance': 'Wedding reception dance celebration',
  // Indian wedding specific
  'traditional-moment': 'Traditional Indian wedding ceremony moment',
  'indian-wedding-celebration-edmonton': 'Indian wedding celebration in Edmonton',
  'indian-wedding-ring-detail-edmonton': 'Indian wedding ring detail in Edmonton',
  'indian-wedding-couple-veil-edmonton': 'Indian wedding couple veil portrait in Edmonton',
  'indian-wedding-ceremony-moment-edmonton': 'Indian wedding ceremony moment in Edmonton',
  'indian-wedding-portrait-edmonton': 'Indian wedding couple portrait in Edmonton',
  'mehndi-hands': 'Beautiful mehndi (henna) hand design',
  'ceremony-exchange': 'Indian wedding ceremony exchange of garlands',
  'sangeet-dance': 'Energetic sangeet dance celebration',
  'couple-candid': 'Candid couple moment at the wedding',
  'reception-glow': 'Reception glow and ambiance',
  'baraat-procession': 'Baraat procession celebrating the groom\'s arrival',
  'barn-couple-portrait': 'Couple portrait at a rustic barn venue',
  'couple-embrace': 'Intimate couple embrace',
  'bridal-portrait-edmonton': 'Bridal portrait photography in Edmonton',
  'ceremony-emotion': 'Emotional ceremony moment',
  'ceremony-sacred': 'Sacred Indian wedding ceremony ritual',
  'couple-portrait-2': 'Couple portrait during the celebration',
  'reception-moment': 'Memorable reception moment',
  'henna-closeup': 'Closeup of intricate henna design',
  'rustic-barn-venue': 'Rustic barn wedding venue setting',
  'couple-moment': 'Sweet couple moment during the wedding',
  'baraat-energy': 'High energy baraat celebration',
  'first-dance': 'First dance at the reception',
  'bridal-smile': 'Radiant bridal smile',
  'bridal-glow': 'Bridal glow and beauty portrait',
  'wedding-laughter': 'Joyful laughter at the wedding',
  'vidaai-emotion': 'Emotional vidaai farewell moment',
  'outdoor-portrait': 'Outdoor portrait session',
  'couple-embrace': 'Tender couple embrace',
  'reception-dance-2': 'Reception dance floor celebration',
  'first-look-indian': 'First look moment at an Indian wedding',
  'sangeet-joy': 'Joyful sangeet celebration',
  'vidaai-tears': 'Tearful vidaai farewell ceremony',
  'couple-sunset': 'Couple portrait at sunset',
  'haldi-color': 'Vibrant haldi ceremony colors',
  'barn-couple-dancing': 'Couple dancing at a barn venue',
  'ceremony-moment': 'Touching ceremony moment',
  // Engagement
  'engagement-session-cherry-blossom-edmonton': 'Cherry blossom engagement session in Edmonton',
  'engagement-couple-cherry-blossom-closeup-edmonton': 'Engagement couple closeup among cherry blossoms in Edmonton',
  'banff-lake-minnewanka-couple-portrait': 'Couple portrait at Lake Minnewanka, Banff engagement session by MH Photography',
  'lake-minnewanka-engagement-session': 'Engagement session at Lake Minnewanka, Banff National Park',
  'banff-engagement-mountain-backdrop': 'Banff engagement photography with Rocky Mountain backdrop',
  'lake-minnewanka-romantic-moment': 'Romantic moment at Lake Minnewanka during Banff engagement session',
  'edmonton-wedding-couple-cinematic-moment': 'Cinematic couple moment at an Edmonton wedding by MH Photography',
  'edmonton-wedding-candid-celebration': 'Candid celebration moment at an Edmonton wedding',
  'edmonton-wedding-ceremony-portrait': 'Wedding ceremony portrait in Edmonton by MH Photography',
  'edmonton-family-outdoor-candid': 'Candid outdoor family photography session in Edmonton',
  'edmonton-family-portrait-session': 'Family portrait session in Edmonton by MH Photography',
  'edmonton-family-kids-moment': 'Kids moment during Edmonton family photo session',
  'edmonton-family-lifestyle-photography': 'Lifestyle family photography in Edmonton by MH Photography',
  // Family
  'fall-family-candid': 'Candid family moment during a fall photo session',
  'fall-kids-playing': 'Kids playing during a fall family photography session',
  'autumn-portrait': 'Beautiful autumn family portrait',
  'family-laugh': 'Family laughing together during their session',
  'golden-hour-family': 'Golden hour family portrait session',
  'siblings-together': 'Siblings portrait together',
  'park-session': 'Family photography session at the park',
  'family-walk': 'Family walking together during their session',
  'fall-leaves-moment': 'Family moment among fall leaves',
  'parent-child': 'Tender parent and child portrait',
  'outdoor-family-2': 'Outdoor family portrait session',
  'river-valley-session': 'Family session in Edmonton\'s River Valley',
  'family-embrace': 'Family embrace and togetherness',
  'kids-adventure': 'Kids on an adventure during family photos',
  'autumn-warmth': 'Warm autumn family portrait',
  'family-joy': 'Joyful family portrait session',
};

// Hero image descriptions
const heroMeta: Record<string, { title: string; caption: string }> = {
  'best-family.jpg': { title: 'Edmonton Family Photography by MH Photo', caption: 'Professional family photography session in Edmonton, Alberta by MH Photo.' },
  'best-family-2.jpg': { title: 'Family Portrait Photography Edmonton', caption: 'Beautiful family portrait captured during a professional photo session in Edmonton.' },
  'best-indian-1.jpg': { title: 'Indian Wedding Photography Edmonton', caption: 'Stunning Indian wedding photography in Edmonton by MH Photo. South Asian wedding specialist.' },
  'best-indian-2.jpg': { title: 'South Asian Wedding Photographer Edmonton', caption: 'South Asian wedding celebration captured by MH Photo, Edmonton\'s Indian wedding photography specialist.' },
  'best-indian-3.jpg': { title: 'Indian Wedding Ceremony Edmonton', caption: 'Traditional Indian wedding ceremony beautifully captured in Edmonton by MH Photo.' },
  'best-wedding-1.jpg': { title: 'Edmonton Wedding Photography', caption: 'Professional wedding photography in Edmonton by MH Photo. Capturing your most memorable moments.' },
  'best-wedding-2.jpg': { title: 'Wedding Photographer Edmonton Alberta', caption: 'Beautiful Edmonton wedding captured by MH Photo, professional wedding photographer.' },
  'best-wedding-3.jpg': { title: 'Edmonton Wedding Day Photography', caption: 'Wedding day photography in Edmonton, Alberta by MH Photo.' },
  'hero-1.jpg': { title: 'MH Photo Edmonton Wedding Photography', caption: 'MH Photo, Edmonton\'s premier wedding and event photographer.' },
  'hero-2.jpg': { title: 'Professional Wedding Photography Edmonton', caption: 'Professional wedding photography services in Edmonton, Alberta.' },
  'hero-3.jpg': { title: 'Edmonton Wedding Photographer Portfolio', caption: 'Portfolio showcase from MH Photo, Edmonton wedding photographer.' },
  'hero-4.jpg': { title: 'Wedding Photography Edmonton Alberta', caption: 'Wedding photography in Edmonton, Alberta by MH Photo.' },
  'hero-5.jpg': { title: 'MH Photo Wedding Portfolio', caption: 'Award-worthy wedding photography from MH Photo in Edmonton.' },
  'hero-indian-1.jpg': { title: 'Indian Wedding Photography Portfolio Edmonton', caption: 'Indian wedding photography portfolio by MH Photo, Edmonton\'s South Asian wedding specialist.' },
  'hero-indian-2.jpg': { title: 'South Asian Wedding Photography Edmonton', caption: 'South Asian wedding photography by MH Photo in Edmonton, Alberta.' },
  'hm-sangeet.jpg': { title: 'Sangeet Photography Edmonton', caption: 'Sangeet night celebration photography by MH Photo in Edmonton.' },
  'indian-anand-karaj.jpg': { title: 'Anand Karaj Sikh Wedding Photography Edmonton', caption: 'Anand Karaj Sikh wedding ceremony photography in Edmonton by MH Photo.' },
  'indian-couple.jpg': { title: 'Indian Wedding Couple Portrait Edmonton', caption: 'Indian wedding couple portrait by MH Photo, Edmonton wedding photographer.' },
  'indian-haldi.jpg': { title: 'Haldi Ceremony Photography Edmonton', caption: 'Vibrant haldi ceremony photography in Edmonton by MH Photo.' },
  'indian-reception.jpg': { title: 'Indian Wedding Reception Photography', caption: 'Indian wedding reception celebration captured by MH Photo in Edmonton.' },
  'indian-ritual.jpg': { title: 'Indian Wedding Ritual Photography Edmonton', caption: 'Traditional Indian wedding ritual beautifully documented by MH Photo in Edmonton.' },
  'indian-sangeet.jpg': { title: 'Sangeet Dance Photography Edmonton', caption: 'Sangeet dance celebration photography by MH Photo in Edmonton, Alberta.' },
  'ld-first-look.jpg': { title: 'First Look Wedding Photography Edmonton', caption: 'Emotional first look moment captured by MH Photo, Edmonton wedding photographer.' },
  'ld-kiss.jpg': { title: 'Wedding Kiss Photography Edmonton', caption: 'The perfect wedding kiss captured by MH Photo in Edmonton.' },
  'ld-outdoor.jpg': { title: 'Outdoor Wedding Photography Edmonton', caption: 'Outdoor wedding photography in Edmonton by MH Photo.' },
  'ld-sunset.jpg': { title: 'Sunset Wedding Photography Edmonton', caption: 'Golden hour sunset wedding photography in Edmonton by MH Photo.' },
  'motion-couple.jpg': { title: 'Creative Wedding Photography Edmonton', caption: 'Creative motion-blur couple portrait by MH Photo, Edmonton wedding photographer.' },
  'ny-bride.jpg': { title: 'Bridal Portrait Photography Edmonton', caption: 'Stunning bridal portrait by MH Photo in Edmonton, Alberta.' },
  'ny-ceremony.jpg': { title: 'Wedding Ceremony Photography Edmonton', caption: 'Wedding ceremony photography captured by MH Photo in Edmonton.' },
  'ny-couple.jpg': { title: 'Couple Portrait Photography Edmonton', caption: 'Couple portrait session by MH Photo, professional Edmonton wedding photographer.' },
  'ny-golden.jpg': { title: 'Golden Hour Wedding Photography Edmonton', caption: 'Golden hour wedding portrait by MH Photo in Edmonton, Alberta.' },
};

function getGalleryImages(publicDir: string): ImageEntry[] {
  const entries: ImageEntry[] = [];
  const categories = ['weddings', 'indian-weddings', 'engagement', 'family'] as const;

  for (const category of categories) {
    const meta = categoryMeta[category];
    const dir = path.join(publicDir, 'gallery-images', category);

    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f)).sort();

    for (const file of files) {
      const cleanName = file.replace(/\.[^.]+$/, '').replace(/^\d+-/, '');
      const mappedCaption = captionMap[cleanName];
      const derivedTitle = filenameToTitle(file);

      const title = derivedTitle || meta.defaultTitle;
      const caption = mappedCaption
        ? `${mappedCaption} - ${meta.keywords} by MH Photo`
        : meta.defaultCaption;

      entries.push({
        loc: `${SITE}/gallery-images/${category}/${encodeURIComponent(file)}`,
        title,
        caption,
        pageUrl: meta.pageUrl,
      });
    }
  }

  return entries;
}

function getHeroImages(publicDir: string): ImageEntry[] {
  const entries: ImageEntry[] = [];
  const dir = path.join(publicDir, 'images', 'hero');

  if (!fs.existsSync(dir)) return entries;

  const files = fs.readdirSync(dir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f)).sort();

  for (const file of files) {
    const meta = heroMeta[file];
    entries.push({
      loc: `${SITE}/images/hero/${encodeURIComponent(file)}`,
      title: meta?.title || 'MH Photo Edmonton Wedding Photography',
      caption: meta?.caption || 'Professional wedding and event photography by MH Photo in Edmonton, Alberta.',
      pageUrl: `${SITE}/`,
    });
  }

  return entries;
}

export const GET: APIRoute = async () => {
  // Resolve the public directory - at build time, this is the project root's public/
  const publicDir = path.resolve('public');

  const galleryImages = getGalleryImages(publicDir);
  const heroImages = getHeroImages(publicDir);

  // Group images by page URL
  const pageMap = new Map<string, ImageEntry[]>();
  for (const img of [...heroImages, ...galleryImages]) {
    const existing = pageMap.get(img.pageUrl) || [];
    existing.push(img);
    pageMap.set(img.pageUrl, existing);
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  for (const [pageUrl, images] of pageMap) {
    xml += `  <url>\n`;
    xml += `    <loc>${escapeXml(pageUrl)}</loc>\n`;
    for (const img of images) {
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${escapeXml(img.loc)}</image:loc>\n`;
      xml += `      <image:title>${escapeXml(img.title)}</image:title>\n`;
      xml += `      <image:caption>${escapeXml(img.caption)}</image:caption>\n`;
      xml += `    </image:image>\n`;
    }
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
