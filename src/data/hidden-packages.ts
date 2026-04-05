// ============================================================
//  HIDDEN PACKAGE PAGES — EDIT PRICING HERE
//  These pages are NOT in the nav or sitemap.
//  Share links directly with clients:
//    /wedding-packages/
//    /multiday-packages/
//
//  Last updated: April 4, 2026
// ============================================================

export interface PackageItem {
  name: string;
  features: string[];
  price: string;
  popular?: boolean;
}

export interface PackageCategory {
  title: string;
  subtitle: string;
  note: string;
  packages: PackageItem[];
}

export interface AddOn {
  name: string;
  price: string;
}

// ===========================
//  SINGLE-DAY WEDDING PACKAGES
// ===========================
export const weddingPackages: PackageCategory[] = [
  {
    title: 'Photography',
    subtitle: 'Wedding Packages',
    note: 'Each package comes with a complimentary engagement session — this helps us break the ice and get to know each other!',
    packages: [
      {
        name: 'Package 1',
        features: [
          '12 hours coverage',
          'Two photographer coverage',
          'Retouched high-resolution photo collection',
          'Password-protected online gallery',
        ],
        price: '$4,000',
      },
      {
        name: 'Package 2',
        features: [
          '10 hours coverage',
          'Two photographer coverage',
          'Retouched high-resolution photo collection',
          'Password-protected online gallery',
        ],
        price: '$3,000',
        popular: true,
      },
      {
        name: 'Package 3',
        features: [
          '7 hours coverage',
          '1 photographer coverage',
          'Retouched high-resolution photo collection',
          'Password-protected online gallery',
        ],
        price: '$2,250',
      },
    ],
  },
  {
    title: 'Videography',
    subtitle: 'Wedding Packages',
    note: 'Each package comes with a complimentary engagement session — this helps us break the ice and get to know each other!',
    packages: [
      {
        name: 'Package 1',
        features: [
          '12 hours coverage',
          'Two videographer coverage',
          'Highlight video (up to 4 minutes)',
          'Extended highlight video (up to 15 mins)',
          'Edited footage of reception & ceremony',
        ],
        price: '$4,750',
      },
      {
        name: 'Package 2',
        features: [
          '10 hours coverage',
          'Two videographer coverage',
          'Highlight video (up to 5 minutes)',
          'Edited footage of reception & ceremony',
        ],
        price: '$4,250',
        popular: true,
      },
      {
        name: 'Package 3',
        features: [
          '7 hours coverage',
          'Two videographer coverage',
          'Highlight video (up to 5 minutes)',
        ],
        price: '$3,750',
      },
    ],
  },
  {
    title: 'Photo + Video',
    subtitle: 'The Ultimate Package',
    note: 'Both photos and videos from one vendor — one team, one vision, zero coordination stress.',
    packages: [
      {
        name: 'Package 1',
        features: [
          '2 photographers + 2 videographers',
          '12 hours coverage',
          'Highlight video (up to 5 mins)',
          'Edited footage of ceremony & reception',
          'Password-protected online gallery',
        ],
        price: '$10,000',
        popular: true,
      },
      {
        name: 'Package 2',
        features: [
          '1 photographer + 2 videographers',
          '10 hours coverage',
          'Highlight video (up to 5 mins)',
          'Edited footage of ceremony & reception',
          'Password-protected online gallery',
        ],
        price: '$8,750',
      },
    ],
  },
];

// ===========================
//  MULTI-DAY WEDDING PACKAGES
// ===========================
export const multidayPackages: PackageCategory[] = [
  {
    title: 'Photography',
    subtitle: 'Multi-Day Packages',
    note: 'Each package comes with a complimentary engagement session — this helps us break the ice and get to know each other!',
    packages: [
      {
        name: 'Package 1',
        features: [
          '2 photographers',
          'Pre-wedding events (12 hours)',
          '12 hours ceremony',
          '6 hours reception',
        ],
        price: '$11,990',
      },
      {
        name: 'Package 2',
        features: [
          '2 photographers',
          'Pre-wedding events (4 hours)',
          '8 hours ceremony',
          '4 hours reception',
        ],
        price: '$7,990',
        popular: true,
      },
      {
        name: 'Package 3',
        features: [
          '1 photographer',
          'Pre-wedding events (2 hours)',
          '8 hours ceremony',
          '2 hours reception',
        ],
        price: '$6,490',
      },
    ],
  },
  {
    title: 'Videography',
    subtitle: 'Multi-Day Packages',
    note: 'Each package comes with a complimentary engagement session — this helps us break the ice and get to know each other!',
    packages: [
      {
        name: 'Package 1',
        features: [
          '2 videographers',
          'Pre-wedding events (12 hours)',
          '12 hours ceremony',
          '8 hours reception',
          'Highlight video (up to 5 mins)',
          'Extended highlight (up to 15 min)',
          'Edited footage of ceremony & reception',
        ],
        price: '$13,490',
      },
      {
        name: 'Package 2',
        features: [
          '2 videographers',
          'Pre-wedding events (6 hours)',
          '10 hours ceremony',
          '4 hours reception',
          'Highlight video (up to 5 mins)',
          'Edited footage of ceremony & reception',
        ],
        price: '$9,990',
        popular: true,
      },
      {
        name: 'Package 3',
        features: [
          '2 videographers',
          'Pre-wedding events (2 hours)',
          '6 hours ceremony',
          '4 hours reception',
          'Highlight video (up to 5 mins)',
          'Edited footage of ceremony & reception',
        ],
        price: '$7,490',
      },
    ],
  },
  {
    title: 'Photo + Video',
    subtitle: 'The Ultimate Multi-Day Package',
    note: 'The only packages I currently offer for multi-day photo + video.',
    packages: [
      {
        name: 'Package 1',
        features: [
          '2 photographers + 2 videographers',
          'Pre-wedding events (3 hours)',
          '8 hours ceremony',
          '6 hours reception',
          'Highlight video (up to 5 mins)',
          'Edited footage of ceremony & reception',
          'Online gallery + retouched photo collection',
        ],
        price: '$17,990',
        popular: true,
      },
      {
        name: 'Package 2',
        features: [
          '2 photographers + 2 videographers',
          'Pre-wedding events (12 hours)',
          '12 hours ceremony',
          '8 hours reception',
          'Highlight video (up to 5 mins)',
          'Extended highlight (up to 15 minutes)',
          'Edited footage of ceremony & reception',
          'Online gallery + retouched photo collection',
        ],
        price: '$23,990',
      },
    ],
  },
];

// ===========================
//  ADD-ONS — SINGLE-DAY WEDDINGS
// ===========================
export const weddingAddOns: AddOn[] = [
  { name: 'Additional hour — Photographer', price: '$350/hr' },
  { name: 'Additional hour — Videographer', price: '$400/hr' },
  { name: 'Team overage (Photo + Video, 4 shooters)', price: '$1,200/hr' },
  { name: 'Same-day Slideshow (photo) — edited images played at your reception', price: '$650' },
  { name: 'Album (30–50 pages)', price: '$950' },
];

// ===========================
//  ADD-ONS — MULTI-DAY WEDDINGS
// ===========================
export const addOns: AddOn[] = [
  { name: 'Additional hour — Photographer', price: '$350/hr' },
  { name: 'Additional hour — Videographer', price: '$400/hr' },
  { name: 'Team overage (Photo + Video, 4 shooters)', price: '$1,200/hr' },
  { name: 'Next-day Slideshow (photo) — edited images played at reception', price: '$650' },
  { name: 'Next-day Edit (video) — highlight film played at reception', price: '$1,950' },
  { name: 'Album (30–50 pages)', price: '$950' },
];
