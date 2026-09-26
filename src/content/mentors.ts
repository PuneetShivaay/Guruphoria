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
  /** Marks an empty "we are hiring" slot. */
  placeholder?: boolean;
}

export const mentors: Mentor[] = [
  {
    slug: 'puneet-shivaay',
    name: 'Puneet Shivaay',
    role: 'Founder · Web, Python & AI',
    photo: '',
    bio: 'Started Guruphoria in a Gomti Nagar classroom in 2020. Teaches web development, Python and the new AI track.',
    languages: ['English'],
    teaches: ['web-development', 'data-and-python', 'ai-and-emerging-tech'],
    linkedin: '',
  },
  {
    slug: 'shekhar-sharma',
    name: 'Shekhar Sharma',
    role: 'Mentor · Data & Programming',
    photo: '',
    bio: 'Teaches data handling and programming fundamentals in Hinglish.',
    languages: ['Hinglish'],
    teaches: ['data-and-python'],
  },
  {
    slug: 'mentor-three',
    name: 'Mentor Name',
    role: 'Mentor · Communication',
    photo: '',
    bio: 'Placeholder — replace with real mentor details.',
    languages: ['Hinglish'],
    teaches: ['communication-and-personality'],
  },
  {
    slug: 'mentor-four',
    name: 'Mentor Name',
    role: 'Mentor · Personality Development',
    photo: '',
    bio: 'Placeholder — replace with real mentor details.',
    languages: ['Hinglish'],
    teaches: ['communication-and-personality'],
  },
  {
    slug: 'mentor-five',
    name: 'Mentor Name',
    role: 'Mentor · Frontend',
    photo: '',
    bio: 'Placeholder — replace with real mentor details.',
    languages: ['English'],
    teaches: ['web-development'],
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
