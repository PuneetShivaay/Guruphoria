/**
 * Mentors — the section that turns a portfolio into an institute.
 *
 * TODO(puneet): replace placeholder entries with real name, photo, subject,
 * one-line bio and language for each mentor. Drop photos in /public/mentors/.
 */

import type { Language } from './programs';

export interface Mentor {
  slug: string;
  name: string;
  role: string;
  /** Path under /public, e.g. '/mentors/puneet.jpg'. Empty = initials fallback. */
  photo: string;
  bio: string;
  languages: Language[];
  teaches: string[];
  linkedin?: string;
  /**
   * Announced faculty whose first lecture is not published yet. The UI must
   * label these, so nobody clicks through expecting sessions that do not exist.
   */
  upcoming?: boolean;
  /** Marks an empty "we are hiring" slot. */
  placeholder?: boolean;
}

export const mentors: Mentor[] = [
  {
    slug: 'puneet-kumar',
    name: 'Puneet Kumar',
    role: 'Founder · Web, Python & AI',
    photo: '/images/mentors/puneet.png',
    bio: 'Started Guruphoria in a Gomti Nagar classroom in 2020. Teaches web development, Python and the new AI track.',
    languages: ['English'],
    teaches: ['Web Development & AI'],
    linkedin: 'https://www.linkedin.com/in/puneetshivaay',
  },
  {
    slug: 'shekhar-sharma',
    name: 'Shekhar Sharma',
    role: 'Co-Founder · Data & Programming',
    photo: '/images/mentors/shekhar.jpg',
    bio: 'Teaches data handling and programming fundamentals in Hinglish.',
    languages: ['Hinglish'],
    teaches: ['Data and Python'],
    linkedin: 'https://www.linkedin.com/in/sharmashekharr',
  },
  {
    slug: 'ratnesh-kumar',
    name: 'Ratnesh Kumar',
    role: 'Mentor · AI & ML',
    photo: '/images/mentors/ratnesh.jpg',
    // TODO(puneet): photo -> /public/mentors/ratnesh-kumar.jpg, plus languages and LinkedIn.
    bio: 'AI/ML engineer. Joins the AI & Emerging Tech Lab as we build it out; first sessions are in production.',
    languages: ["English"],
    teaches: ['AI and Emerging Tech'],
    upcoming: true,
    linkedin: 'https://www.linkedin.com/in/kratnesh'
  },
  {
    slug: 'dheeraj-kumar',
    name: 'Dheeraj Kumar',
    role: 'Mentor · Blockchain',
    photo: '/images/mentors/dheeraj.jpg',
    // TODO(puneet): photo -> /public/mentors/dheeraj-kumar.jpg, plus languages and LinkedIn.
    bio: 'Blockchain developer. Brings decentralised tech into the AI & Emerging Tech Lab; first sessions are in production.',
    languages: ["Hinglish"],
    teaches: ['Blockchain and Emerging Tech'],
    upcoming: true,
    linkedin: 'https://www.linkedin.com/in/dheeraj-kumar-a8b532170'
  },
  {
    slug: 'ritu-chaudhary',
    name: 'Ritu Chaudhary',
    role: 'Mentor · QA Testing',
    photo: '/images/mentors/ritu.png',
    bio: 'QA Testing expert. Guides students through testing methodologies and best practices.',
    languages: ['Hinglish'],
    teaches: ['QA-Testing'],
    upcoming: true,
    linkedin: 'https://www.linkedin.com/in/rituchaudharyqa',
  },
  {
    slug: 'ghanist-baghel',
    name: 'Ghanist Baghel',
    role: 'Mentor · Marketing',
    photo: '/images/mentors/ghanist.jpg',
    bio: 'Marketing specialist. Helps students understand market trends and strategies.',
    languages: ['English'],
    teaches: ['Marketing'],
    linkedin: 'https://www.linkedin.com/in/ghanist-baghel',
  },
  {
    slug: 'joining-soon',
    name: 'Joining soon',
    role: 'We are growing the faculty',
    photo: '',
    bio: 'Interested in teaching with us? Get in touch.',
    languages: [],
    teaches: [],
    placeholder: true,
  },
];

/** Initials fallback when no photo is set. */
export function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
