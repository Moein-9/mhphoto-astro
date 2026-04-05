export const primaryNav = [
  { label: 'Home', href: '/' },
  { label: 'Photography', href: '/photography/' },
  { label: 'Videography', href: '/videography/' },
  { label: 'Packages', href: '/pricing/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
] as const;

export const photographyNav = [
  { label: 'Weddings', href: '/photography/weddings/', slug: 'weddings' },
  { label: 'Indian Weddings', href: '/photography/indian-weddings/', slug: 'indian-weddings' },
  { label: 'Family', href: '/photography/family/', slug: 'family' },
  { label: 'Engagement', href: '/photography/engagement/', slug: 'engagement' },
] as const;
