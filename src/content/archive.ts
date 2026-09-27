/**
 * The archive — Chapter One, 2020–2021.
 *
 * HONESTY RULES:
 *  - Every entry here is a real video from youtube.com/@guruphoria.
 *  - `year` is always displayed. Hiding the age of the library reads evasive;
 *    showing it reads confident. The fundamentals have not changed.
 *  - Nothing is invented to make the catalogue look fuller.
 *
 * TODO(puneet): add the real `videoId` for each entry so cards can link
 * straight to the video and use the real YouTube thumbnail. Until then the
 * cards link to the channel and render a typographic placeholder.
 */

import type { Language } from './programs';

export interface ArchiveVideo {
  /** YouTube video ID. Empty until supplied — card falls back to the channel. */
  videoId: string;
  title: string;
  /** Slug of the program this belongs to. */
  program: string;
  /** Display label, e.g. "Data & Python". */
  programLabel: string;
  language: Language;
  /** Runtime as shown on YouTube, e.g. "54:51". */
  duration: string;
  year: string;
  /** True for streamed sessions — long live classes are a credibility signal. */
  isLive: boolean;
}

/**
 * Featured live classes. These are real sessions from the channel.
 * The full library is 63 videos across 15 playlists.
 */
export const archive: ArchiveVideo[] = [
  {
    videoId: '',
    title: 'Data Handling in Pandas Series · Lecture 5 · Information Practice',
    program: 'data-and-python',
    programLabel: 'Data & Python',
    language: 'English',
    duration: '54:51',
    year: '2021',
    isLive: true,
  },
  {
    videoId: '',
    title: 'English Class Basic · Lecture 1 · English Grammar',
    program: 'communication-and-personality',
    programLabel: 'Communication & Personality',
    language: 'Hinglish',
    duration: '56:55',
    year: '2021',
    isLive: true,
  },
  {
    videoId: '',
    title: 'Data Handling Using Pandas · Lecture 4 · Information Practice',
    program: 'data-and-python',
    programLabel: 'Data & Python',
    language: 'English',
    duration: '49:47',
    year: '2021',
    isLive: true,
  },
  {
    videoId: '',
    title: 'Parts of Speech · Part 1 · Lecture 3 · English Grammar',
    program: 'communication-and-personality',
    programLabel: 'Communication & Personality',
    language: 'Hinglish',
    duration: '43:12',
    year: '2021',
    isLive: true,
  },
  {
    videoId: '',
    title: 'English Series · Lecture 2 · English Grammar',
    program: 'communication-and-personality',
    programLabel: 'Communication & Personality',
    language: 'Hinglish',
    duration: '43:12',
    year: '2021',
    isLive: true,
  },
  {
    videoId: '',
    title: 'Pandas Basic · Lecture 3 Revision · Data Structure',
    program: 'data-and-python',
    programLabel: 'Data & Python',
    language: 'English',
    duration: '23:29',
    year: '2021',
    isLive: true,
  },
];

/**
 * The most recent thing we published. Surfaced in the homepage hero and at
 * the top of /live, so the site always has something current on it.
 */
export const latest: ArchiveVideo = archive[0];

/** Total live teaching hours in the archive — an honest, specific number. */
export const liveHours = 20;
