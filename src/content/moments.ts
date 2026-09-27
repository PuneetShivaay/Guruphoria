/**
 * Moments — photographs from the Gomti Nagar institute, 2020–2021.
 *
 * This is the *photographic* record of Chapter One. The *video* record lives
 * in `archive.ts` and is surfaced on `/live`. Keep the two separate: one is
 * the teaching, the other is the room it happened in.
 *
 * HONESTY RULES (inherited from `archive.ts`):
 *  - Every photograph here is a real photograph from the institute.
 *  - `year` is always displayed. The age of the material is the point —
 *    these are memories, not a claim about what is running today.
 *  - Nothing is stock. If we do not have a photograph, the tile does not
 *    exist. An empty `src` renders a typographic placeholder rather than
 *    inventing an image.
 *
 * TODO(puneet): drop the real photographs into /public/moments/ and fill in
 * `src` for each entry below, adding or removing entries to match what you
 * actually have. Delete any entry you cannot supply a real photograph for.
 */

/** Groups the gallery. Keep the list short — these are the real occasions. */
export type MomentCategory =
  | "Teachers' Day"
  | 'The classroom'
  | 'Students'
  | 'The institute';

export interface Moment {
  /**
   * Path under /public, e.g. '/moments/teachers-day-2020.jpg'.
   * Empty until supplied — the tile falls back to a typographic placeholder.
   */
  src: string;
  /** One specific sentence. "Teachers' Day, 2020" beats "A nice memory". */
  caption: string;
  /** Always shown. See the honesty rules above. */
  year: string;
  category: MomentCategory;
  /**
   * True for the handful of photographs worth showing larger. Used to break
   * the grid rhythm so the page does not read as a contact sheet.
   */
  featured?: boolean;
}

export const moments: Moment[] = [
  {
    src: '',
    caption: "Teachers' Day at the institute — students took over the whiteboard",
    year: '2020',
    category: "Teachers' Day",
    featured: true,
  },
  {
    src: '',
    caption: "Teachers' Day celebrations with the morning batch",
    year: '2020',
    category: "Teachers' Day",
  },
  {
    src: '',
    caption: 'The classroom in Vikas Khand, Gomti Nagar',
    year: '2020',
    category: 'The classroom',
    featured: true,
  },
  {
    src: '',
    caption: 'A whiteboard session mid-explanation',
    year: '2020',
    category: 'The classroom',
  },
  {
    src: '',
    caption: 'The computer lab — where most of the practicals happened',
    year: '2020',
    category: 'The institute',
  },
  {
    src: '',
    caption: 'A batch at the end of a session',
    year: '2021',
    category: 'Students',
  },
];

/** Display order for the filter row and the section grouping. */
export const momentCategories: MomentCategory[] = [
  "Teachers' Day",
  'The classroom',
  'Students',
  'The institute',
];

/** Only the photographs we actually have files for. */
export const availableMoments = moments.filter((m) => m.src !== '');

/** Grouped for rendering, preserving `momentCategories` order. */
export function momentsByCategory(): Array<{
  category: MomentCategory;
  items: Moment[];
}> {
  return momentCategories
    .map((category) => ({
      category,
      items: moments.filter((m) => m.category === category),
    }))
    .filter((group) => group.items.length > 0);
}
