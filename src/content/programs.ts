/**
 * Programs — our 15 YouTube playlists restructured into 4 sequenced curricula.
 *
 * A playlist looks casual. A Program looks like an institute.
 * Same videos, different presentation.
 *
 * HONESTY RULE: `status: 'growing'` must be used for any track whose
 * catalogue is still thin. Never present 6 videos as a mature program.
 */

export type Language = 'English' | 'Hinglish';
export type ProgramStatus = 'established' | 'growing';

/**
 * The four programs, as a closed set.
 *
 * Anything that *links* to a program must be typed as `ProgramSlug` so a
 * typo or a display label used in place of a slug fails the build rather
 * than shipping a 404. Add a slug here only when the program exists.
 */
export type ProgramSlug =
  | 'web-development'
  | 'data-and-python'
  | 'communication-and-personality'
  | 'ai-and-emerging-tech';

export interface ProgramModule {
  title: string;
  /** Source playlist on YouTube, for traceability. */
  source?: string;
  lessons?: number;
}

export interface Program {
  slug: ProgramSlug;
  title: string;
  category: 'Career Skills' | 'AI Track';
  status: ProgramStatus;
  /** One sentence. What you will be able to do afterwards. */
  blurb: string;
  lessonCount: number;
  /** Display string, e.g. "32 lessons" or "9 live lectures". */
  countLabel: string;
  languages: Language[];
  audience: Array<'student' | 'professional'>;
  modules: ProgramModule[];
}

export const programs: Program[] = [
  {
    slug: 'web-development',
    title: 'Web Development',
    category: 'Career Skills',
    status: 'established',
    blurb:
      'WordPress zero-to-hero, JavaScript foundations and React. Build and ship real websites you can show an employer.',
    lessonCount: 32,
    countLabel: '32 lessons',
    languages: ['English'],
    audience: ['student', 'professional'],
    modules: [
      { title: 'Website Development Using WordPress (Zero to Hero)', source: 'WordPress', lessons: 24 },
      { title: 'Intro to JavaScript', source: 'JavaScript Course', lessons: 3 },
      { title: 'React Foundations', source: 'React', lessons: 2 },
      { title: 'Web Development Tricks', source: 'Web Development Tricks', lessons: 3 },
    ],
  },
  {
    slug: 'data-and-python',
    title: 'Data & Python',
    category: 'Career Skills',
    status: 'established',
    blurb:
      'A sequenced live series on Pandas and data handling, taught lecture by lecture from series basics to real practice sessions.',
    lessonCount: 9,
    countLabel: '9 live lectures',
    languages: ['English'],
    audience: ['student', 'professional'],
    modules: [
      { title: 'Series & DataFrames', source: 'Data Handling Using Pandas' },
      { title: 'Indexing and Selection', source: 'Data Handling Using Pandas' },
      { title: 'Operations on Series', source: 'Data Handling Using Pandas' },
      { title: 'Revision & Practice Sessions', source: 'Data Handling Using Pandas' },
    ],
  },
  {
    slug: 'communication-and-personality',
    title: 'Communication & Personality',
    category: 'Career Skills',
    status: 'established',
    blurb:
      'English grammar and personality development — the half of placement preparation that almost nobody teaches, and the half that decides interviews.',
    lessonCount: 25,
    countLabel: '25 lessons',
    languages: ['Hinglish', 'English'],
    audience: ['student'],
    modules: [
      { title: 'English Grammar Live Class', source: 'English Grammar Live Class', lessons: 10 },
      { title: 'Parts of Speech & Sentence Building', source: 'English Grammar Live Class' },
      { title: 'Students Personality Development', source: 'Students Personality Development', lessons: 15 },
      { title: 'Interview Confidence & Communication', source: 'Students Personality Development' },
    ],
  },
  {
    slug: 'ai-and-emerging-tech',
    title: 'AI & Emerging Tech Lab',
    category: 'AI Track',
    status: 'growing',
    blurb:
      'Agentic AI with Google ADK and Vertex AI, plus working experiments in security and cross-platform apps. New, and actively growing.',
    lessonCount: 6,
    countLabel: '6 lessons · adding more',
    languages: ['English'],
    audience: ['professional', 'student'],
    modules: [
      { title: 'Build an Autonomous AI Helpdesk (Google ADK + Vertex AI)', source: 'AI Agent Tutorials & Projects', lessons: 2 },
      { title: 'Cyber Security & Hacking Talks', source: 'Cyber Security', lessons: 1 },
      { title: 'Intro to Flutter', source: 'Flutter', lessons: 1 },
      { title: 'More in production', source: '' },
    ],
  },
];

/** The two-door audience split on the homepage. */
export interface Audience {
  id: 'student' | 'professional';
  title: string;
  blurb: string;
  /**
   * Programs to recommend, as slugs — these build `/programs/<slug>` links.
   * Typed as `ProgramSlug` so an invalid value fails the build rather than
   * rendering a dead link.
   */
  programs: ProgramSlug[];
}

export const audiences: Audience[] = [
  {
    id: 'student',
    title: "I'm a student",
    blurb:
      'Get placement-ready: real projects, English communication, and the confidence to interview well.',
    programs: ['web-development', 'communication-and-personality', 'data-and-python'],
  },
  {
    id: 'professional',
    title: "I'm working",
    blurb:
      'Upskill around your job: practical web development, Python for data, and a growing AI track.',
    programs: ['ai-and-emerging-tech', 'data-and-python', 'web-development'],
  },
];
