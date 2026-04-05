export const site = {
  name: 'MH Photography',
  shortName: 'MH Photo',
  email: 'moein@mhphoto.ca',
  url: 'https://mhphoto.ca',
  owner: 'Moein Habibi',
  tagline: 'Edmonton Wedding Photographer & Videographer',
  get booking() {
    const now = new Date();
    const year = now.getFullYear();
    return `Currently booking ${year} & ${year + 1}`;
  },
  social: {
    instagram: 'https://www.instagram.com/mhphotoss',
    youtube: 'https://www.youtube.com/@MoeinHabibi',
    facebook: 'https://www.facebook.com/MoeinHphotography',
  },
  ga4: 'G-78GJS9X3W8',
} as const;
