const fs = require('fs');
const path = require('path');

const pools = {
  wedding: [
    '/gallery-images/weddings/002-first-look.jpg',
    '/gallery-images/weddings/006-bride-portrait.jpg',
    '/gallery-images/weddings/008-ceremony-kiss.jpg',
    '/gallery-images/weddings/009-ceremony-moment.jpg',
    '/gallery-images/weddings/016-outdoor-portrait.jpg',
    '/gallery-images/weddings/019-first-dance.jpg',
    '/gallery-images/weddings/021-reception-speech.jpg',
    '/gallery-images/weddings/022-ring-exchange.jpg',
    '/gallery-images/weddings/025-reception-emotion.jpg',
    '/gallery-images/weddings/026-sunset-couple.jpg',
    '/gallery-images/weddings/031-couple-portrait-outdoor.jpg',
    '/gallery-images/weddings/034-couple-candid.jpg',
    '/gallery-images/weddings/037-bridal-detail.jpg',
    '/gallery-images/weddings/045-ceremony-emotion.jpg',
    '/gallery-images/weddings/054-reception-dance.jpg',
    '/gallery-images/weddings/012-groom-prep.jpg',
    '/gallery-images/weddings/017-ceremony-entrance.jpg',
    '/gallery-images/weddings/020-first-dance-2.jpg',
    '/gallery-images/weddings/032-dance-floor.jpg',
    '/gallery-images/weddings/005-getting-ready.jpg',
    '/gallery-images/weddings/003-bride-getting-ready.jpg',
    '/gallery-images/weddings/038-bouquet-detail.jpg',
  ],
  'indian-weddings': [
    '/gallery-images/indian-weddings/0002-indian-wedding-celebration-edmonton.jpg',
    '/gallery-images/indian-weddings/002-indian-wedding-couple-veil-edmonton.jpg',
    '/gallery-images/indian-weddings/003-indian-wedding-ceremony-moment-edmonton.jpg',
    '/gallery-images/indian-weddings/004-indian-wedding-portrait-edmonton.jpg',
    '/gallery-images/indian-weddings/007-mehndi-hands.jpg',
    '/gallery-images/indian-weddings/010-sangeet-dance.jpg',
    '/gallery-images/indian-weddings/013-baraat-procession.jpg',
    '/gallery-images/indian-weddings/015-barn-couple-portrait.jpg',
    '/gallery-images/indian-weddings/018-bridal-portrait-edmonton.jpg',
    '/gallery-images/indian-weddings/019-ceremony-emotion.jpg',
    '/gallery-images/indian-weddings/020-ceremony-sacred.jpg',
    '/gallery-images/indian-weddings/029-baraat-energy.jpg',
    '/gallery-images/indian-weddings/034-wedding-laughter.jpg',
    '/gallery-images/indian-weddings/039-vidaai-emotion.jpg',
    '/gallery-images/indian-weddings/043-first-look-indian.jpg',
    '/gallery-images/indian-weddings/046-sangeet-joy.jpg',
    '/gallery-images/indian-weddings/047-vidaai-tears.jpg',
    '/gallery-images/indian-weddings/050-couple-sunset.jpg',
    '/gallery-images/indian-weddings/0000-traditional-moment.jpg',
    '/gallery-images/indian-weddings/001-indian-wedding-ring-detail-edmonton.jpg',
    '/gallery-images/indian-weddings/027-couple-moment.jpg',
    '/gallery-images/indian-weddings/016-couple-embrace.jpg',
  ],
  family: [
    '/gallery-images/family/002-fall-family-candid.jpg',
    '/gallery-images/family/004-fall-kids-playing.jpg',
    '/gallery-images/family/006-autumn-portrait.jpg',
    '/gallery-images/family/008-family-laugh.jpg',
    '/gallery-images/family/011-golden-hour-family.jpg',
    '/gallery-images/family/017-family-walk.jpg',
    '/gallery-images/family/019-fall-leaves-moment.jpg',
    '/gallery-images/family/023-outdoor-family-2.jpg',
    '/gallery-images/family/027-family-embrace.jpg',
    '/gallery-images/family/029-kids-adventure.jpg',
    '/gallery-images/family/031-autumn-warmth.jpg',
    '/gallery-images/family/033-family-joy.jpg',
  ],
  engagement: [
    '/gallery-images/engagement/019-engagement-session-cherry-blossom-edmonton.jpg',
    '/gallery-images/engagement/020-engagement-couple-cherry-blossom-closeup-edmonton.jpg',
    '/gallery-images/engagement/001-Miranda.jpg',
    '/gallery-images/engagement/004-Picture-5.jpg',
    '/gallery-images/engagement/008-Picture-19.jpg',
    '/gallery-images/engagement/010-Picture-6037.jpg',
    '/gallery-images/engagement/012-Picture-20.jpg',
    '/gallery-images/engagement/002-Picture-4.jpg',
  ],
};

// Specific overrides for posts where we know the perfect image
const overrides = {
  'mehndi-ceremony-photography-guide': '/gallery-images/indian-weddings/007-mehndi-hands.jpg',
  'baraat-photography-groom-entrance-guide': '/gallery-images/indian-weddings/013-baraat-procession.jpg',
  'sangeet-night-photography-tips-guide': '/gallery-images/indian-weddings/010-sangeet-dance.jpg',
  'haldi-ceremony-photography-guide': '/gallery-images/indian-weddings/0002-indian-wedding-celebration-edmonton.jpg',
  'vidaai-photography-emotional-indian-wedding': '/gallery-images/indian-weddings/039-vidaai-emotion.jpg',
  'sikh-wedding-photography-edmonton-anand-karaj': '/gallery-images/indian-weddings/020-ceremony-sacred.jpg',
  'first-look-vs-traditional-reveal-wedding': '/gallery-images/weddings/002-first-look.jpg',
  'golden-hour-wedding-photography-edmonton': '/gallery-images/weddings/026-sunset-couple.jpg',
  'wedding-detail-shots-guide': '/gallery-images/weddings/037-bridal-detail.jpg',
  'wedding-reception-photography-tips': '/gallery-images/weddings/054-reception-dance.jpg',
  'rain-wedding-day-edmonton-photographer-guide': '/gallery-images/weddings/031-couple-portrait-outdoor.jpg',
  'natural-wedding-photography-poses-guide': '/gallery-images/weddings/034-couple-candid.jpg',
  'fall-family-photography-edmonton-guide': '/gallery-images/family/019-fall-leaves-moment.jpg',
  'winter-family-photography-edmonton': '/gallery-images/family/031-autumn-warmth.jpg',
  'spring-family-photography-edmonton': '/gallery-images/family/023-outdoor-family-2.jpg',
  'maternity-photography-edmonton-guide': '/gallery-images/family/006-autumn-portrait.jpg',
  'newborn-baby-photography-edmonton-guide': '/gallery-images/family/011-golden-hour-family.jpg',
  'elopement-photography-edmonton-alberta': '/gallery-images/weddings/016-outdoor-portrait.jpg',
  'indian-wedding-decor-photography-tips': '/gallery-images/indian-weddings/001-indian-wedding-ring-detail-edmonton.jpg',
  'wedding-lehenga-photography-tips': '/gallery-images/indian-weddings/018-bridal-portrait-edmonton.jpg',
  'indian-wedding-reception-photography-edmonton': '/gallery-images/indian-weddings/046-sangeet-joy.jpg',
  'indian-wedding-photographer-vs-videographer': '/gallery-images/indian-weddings/004-indian-wedding-portrait-edmonton.jpg',
  'creative-wedding-photography-ideas-edmonton': '/gallery-images/weddings/009-ceremony-moment.jpg',
  'how-to-look-good-wedding-photos': '/gallery-images/weddings/006-bride-portrait.jpg',
  'wedding-photography-trends-2026': '/gallery-images/weddings/019-first-dance.jpg',
  'wedding-photography-shot-list-guide': '/gallery-images/weddings/022-ring-exchange.jpg',
  'holiday-family-photo-cards-edmonton': '/gallery-images/family/033-family-joy.jpg',
  'summer-family-photography-edmonton-tips': '/gallery-images/family/029-kids-adventure.jpg',
  'back-to-school-family-photos-edmonton': '/gallery-images/family/004-fall-kids-playing.jpg',
  'pet-family-photography-edmonton': '/gallery-images/family/017-family-walk.jpg',
  'engagement-photos-edmonton-locations-guide': '/gallery-images/engagement/019-engagement-session-cherry-blossom-edmonton.jpg',
  'how-to-prepare-engagement-photo-session': '/gallery-images/engagement/020-engagement-couple-cherry-blossom-closeup-edmonton.jpg',
  'cherry-blossom-season-special': '/gallery-images/engagement/019-engagement-session-cherry-blossom-edmonton.jpg',
  'indian-wedding-photography-edmonton-complete-guide': '/gallery-images/indian-weddings/003-indian-wedding-ceremony-moment-edmonton.jpg',
  'planning-punjabi-wedding-edmonton-guide': '/gallery-images/indian-weddings/002-indian-wedding-couple-veil-edmonton.jpg',
  'how-to-choose-wedding-photographer-edmonton': '/gallery-images/weddings/008-ceremony-kiss.jpg',
  'wedding-photographer-cost-edmonton-2026': '/gallery-images/weddings/025-reception-emotion.jpg',
  'elspeth-and-prams-indian-wedding-in-edmonton-ab-ca': '/gallery-images/indian-weddings/0000-traditional-moment.jpg',
  'edmonton-indian-sikh-wedding-photographer-andy-and-rami-wedding': '/gallery-images/indian-weddings/020-ceremony-sacred.jpg',
};

function getPool(category, slug) {
  if (category.includes('indian') || slug.includes('indian') || slug.includes('punjabi') ||
      slug.includes('sikh') || slug.includes('mehndi') || slug.includes('baraat') ||
      slug.includes('haldi') || slug.includes('sangeet') || slug.includes('nikah') ||
      slug.includes('vidaai') || slug.includes('hindu') || slug.includes('lehenga') ||
      slug.includes('south-asian') || slug.includes('multi-cultural') || slug.includes('desi'))
    return 'indian-weddings';
  if (category.includes('family') || slug.includes('family') || slug.includes('newborn') ||
      slug.includes('maternity') || slug.includes('baby') || slug.includes('kids') ||
      slug.includes('pet') || slug.includes('back-to-school') || slug.includes('holiday-family') ||
      slug.includes('what-to-wear') || slug.includes('generational') || slug.includes('spring-family') ||
      slug.includes('summer-family') || slug.includes('winter-family') || slug.includes('fall-family'))
    return 'family';
  if (category.includes('engagement') || slug.includes('engagement') || slug.includes('engaged') ||
      slug.includes('couples') || slug.includes('cherry-blossom'))
    return 'engagement';
  return 'wedding';
}

const usageCounters = {};
const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
let fixed = 0;

for (const file of files) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('image: ""')) continue;

  const slug = file.replace('.md', '');
  const catMatch = content.match(/^category:\s*["']?([^"'\n]+)/m);
  const category = catMatch ? catMatch[1].trim().toLowerCase() : '';

  let image;
  if (overrides[slug]) {
    image = overrides[slug];
  } else {
    const poolKey = getPool(category, slug);
    const pool = pools[poolKey];
    if (!usageCounters[poolKey]) usageCounters[poolKey] = 0;
    image = pool[usageCounters[poolKey] % pool.length];
    usageCounters[poolKey]++;
  }

  content = content.replace('image: ""', 'image: "' + image + '"');
  fs.writeFileSync(filePath, content);
  fixed++;
  console.log(slug + ' -> ' + image);
}

console.log('\nFixed ' + fixed + ' posts');
