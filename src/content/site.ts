/**
 * Guruphoria — single source of truth for brand facts.
 *
 * RULE: every number in this file must be independently verifiable.
 * No inflated claims. If we cannot prove it, it does not go here.
 */

export const site = {
  name: 'Guruphoria',
  legalName: 'Guruphoria Institute',
  tagline: 'Build Your Essence',
  foundedYear: 2020,

  description:
    'A learning institute born in a Lucknow classroom. We teach technology, ' +
    'communication and personality — live, by real mentors, in English and ' +
    'Hinglish. Completely free.',

  url: 'https://guruphoria.netlify.app',

  contact: {
    email: 'guruphoria@gmail.com',
    phone: '+91 95691 85486',
  },

  address: {
    street: 'Vikas Khand 5, near Dayal Paradise, Gomti Nagar',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    postalCode: '226010',
    country: 'IN',
  },

  social: {
    youtube: 'https://www.youtube.com/@guruphoria',
    github: 'https://github.com/PuneetShivaay',
    linkedin: 'https://in.linkedin.com/company/guruphoria',
    medium: 'https://puneetshivaay.medium.com/',
  },

  /** Third-party verified ratings — link out so visitors can check. */
  ratings: [
    { score: '5.0', max: 5, count: 8, source: 'Google', href: '' },
    { score: '4.7', max: 5, count: 9, source: 'JustDial', href: '' },
  ],
} as const;

/** Hero stat strip. Honest numbers only. */
export const stats = [
  { value: '2020', label: 'Founded in Lucknow' },
  { value: '200+', label: 'Students taught' },
  { value: '5.0★', label: 'Google rating' },
  { value: '100%', label: 'Free, always' },
] as const;

/** Library counts, derived from the actual YouTube channel. */
export const library = {
  videos: 63,
  liveClasses: 21,
  shorts: 5,
  playlists: 15,
} as const;
