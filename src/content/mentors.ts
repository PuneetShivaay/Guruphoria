/**
 * Mentors — the section that turns a portfolio into an institute.
 *
 * TODO(puneet): replace placeholder entries with real name, photo, subject,
 * one-line bio and language for each mentor. Drop photos in /public/mentors/.
 */

import type { Language, ProgramSlug } from './programs';

/**
 * One thing a mentor teaches.
 *
 * Separates what the reader SEES from where the link GOES:
 *  - `label` is free editorial text. Say "QA Automation" or "Pandas &
 *    DataFrames" — whatever describes the teaching most honestly.
 *  - `programSlug` is optional and never displayed. Supply it and the label
 *    becomes a link to that program; omit it and the label renders as plain
 *    text.
 *
 * This keeps the programme taxonomy fixed at four routes while letting the
 * vocabulary on screen stay as specific as the mentor actually is.
 */
export interface MentorSubject {
  /** Shown to the reader. Free text. */
  label: string;
  /**
   * Internal link target. Typed as `ProgramSlug`, so an invalid value fails
   * the build rather than rendering a dead link. Omit when no programme
   * covers this subject yet — better an honest plain label than a link to
   * something unrelated.
   */
  programSlug?: ProgramSlug;
}

export interface Mentor {
  slug: string;
  name: string;
  role: string;
  /** Path under /public, e.g. '/mentors/puneet.jpg'. Empty = initials fallback. */
  photo: string;
  bio: string;
  languages: Language[];
  /**
   * What this mentor teaches, in their own terms. See `MentorSubject` — each
   * entry carries its own optional link target, so the label and the route
   * are chosen independently.
   */
  subjects: MentorSubject[];
  /**
   * Supporting skills, shown as chips and never linked. Use for tools and
   * specialisms that round out the picture but are not themselves a subject.
   */
  expertise?: string[];
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
    subjects: [
      { label: 'Web Development', programSlug: 'web-development' },
      { label: 'Python & Data', programSlug: 'data-and-python' },
      { label: 'AI Agents', programSlug: 'ai-and-emerging-tech' },
    ],
    expertise: ['React', 'Next.js', 'Python', 'AI Agents'],
    linkedin: 'https://www.linkedin.com/in/puneetshivaay',
  },
  {
    slug: 'shekhar-sharma',
    name: 'Shekhar Sharma',
    role: 'Co-Founder · Data & Programming',
    photo: '/images/mentors/shekhar.jpg',
    bio: 'Teaches data handling and programming fundamentals in Hinglish.',
    languages: ['Hinglish'],
    subjects: [{ label: 'Data & Python', programSlug: 'data-and-python' }],
    expertise: ['Pandas', 'Data Handling', 'Programming Fundamentals'],
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
    subjects: [{ label: 'AI & Machine Learning', programSlug: 'ai-and-emerging-tech' }],
    expertise: ['Machine Learning', 'Deep Learning', 'MLOps'],
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
    /* "Blockchain" is not a programme of its own, but the AI & Emerging Tech
       Lab genuinely covers it — so the label stays specific and still links. */
    subjects: [{ label: 'Blockchain & Web3', programSlug: 'ai-and-emerging-tech' }],
    expertise: ['Blockchain', 'Web3', 'Smart Contracts'],
    upcoming: true,
    linkedin: 'https://www.linkedin.com/in/dheeraj-kumar-a8b532170'
  },
  {
    slug: 'ritu-chaudhary',
    name: 'Ritu Chaudhary',
    role: 'Mentor · QA Automation',
    photo: '/images/mentors/ritu.png',
    bio: 'QA Automation expert. Guides students through testing methodologies and best practices.',
    languages: ['Hinglish'],
    /* No QA programme exists yet, so no `programSlug` — the label renders as
       plain text rather than linking somewhere unrelated. */
    subjects: [{ label: 'QA Automation' }],
    expertise: ['QA Automation', 'Manual Testing', 'Selenium'],
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
    /* No marketing programme yet — plain text, no link. */
    subjects: [{ label: 'Marketing' }],
    expertise: ['Digital Marketing', 'Brand Strategy', 'Market Research'],
    linkedin: 'https://www.linkedin.com/in/ghanist-baghel',
  },
  {
    slug: 'joining-soon',
    name: 'Joining soon',
    role: 'We are growing the faculty',
    photo: '',
    bio: 'Interested in teaching with us? Get in touch.',
    languages: [],
    subjects: [],
    placeholder: true,
  },
];

/** Initials fallback when no photo is set. */
export function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
