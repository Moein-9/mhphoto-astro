export interface PriceItem {
  label: string;
  price: string;
}

export interface Package {
  name: string;
  subtitle: string;
  description: string;
  prices: PriceItem[];
  features: string[];
  image: string;
  highlight?: boolean;
  note?: string;
}

// =============================================
//  EDIT PRICING HERE — just change the numbers
//  Last updated: April 4, 2026
// =============================================

export const packages: Package[] = [
  {
    name: 'Photography',
    subtitle: 'Wedding Packages',
    description: 'We have a few packages to suit your needs — from intimate ceremonies to full weekend celebrations.',
    prices: [
      { label: 'Single-day package starts at', price: '$2,250' },
      { label: 'Multi-day package starts at', price: '$6,490' },
    ],
    features: [
      'Full-day coverage (getting ready to last dance)',
      'Second shooter available',
      'Online gallery with download rights',
      'Professional colour grading',
      'Engagement session add-on available',
    ],
    image: '/images/categories/weddings.jpg',
  },
  {
    name: 'Videography',
    subtitle: 'Wedding Packages',
    description: 'My video style is documentary-oriented — I try to hear and see and make a story from your wedding day or week.',
    prices: [
      { label: 'Single-day package starts at', price: '$3,750' },
      { label: 'Multi-day package starts at', price: '$7,490' },
    ],
    features: [
      'Cinematic wedding film (5-8 min)',
      'Highlight reel (60-90 sec)',
      'Same-day preview clips available',
      'Drone footage when permitted',
      'Licensed music selection',
    ],
    image: '/gallery-images/indian-weddings/007-mehndi-hands.jpg',
  },
  {
    name: 'Photo + Video',
    subtitle: 'Wedding Packages',
    description: 'The ultimate package — both photos and videos from one vendor. One team, one vision, zero coordination stress.',
    prices: [
      { label: 'Single-day package starts at', price: '$8,750' },
      { label: 'Multi-day package starts at', price: '$17,990' },
    ],
    features: [
      'Full photography + videography coverage',
      'Cinematic film + highlight reel',
      'Online gallery + film delivery',
      'Second shooter included',
      'Engagement session included',
    ],
    image: '/images/categories/photo-video.jpg',
    highlight: true,
  },
  {
    name: 'Family Sessions',
    subtitle: 'Lifestyle Packages',
    description: 'My personal fave — I love getting to know the fams and always end up going over the promised time because we just have a blast!',
    prices: [
      { label: 'Family sessions and lifestyle', price: '$400' },
    ],
    features: [
      '1-hour outdoor session',
      '30+ edited images',
      'Online gallery with downloads',
      'Fall mini sessions available',
      'Newborn & maternity sessions',
    ],
    image: '/images/categories/family.jpg',
    note: 'Not in a rush? Reach out towards the end of August — that\'s when I go all out and host a big fall session marathon every year.',
  },
];

// Last price update date — shown on each card
export const priceUpdatedDate = 'Apr 4, 2026';
