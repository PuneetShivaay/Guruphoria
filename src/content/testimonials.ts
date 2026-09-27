/**
 * Testimonials — real students, real names, real outcomes.
 *
 * TODO(puneet): replace with the 10 real testimonials.
 * Each one needs: photo, full name, what they studied, year, where they are
 * now, and ONE SPECIFIC sentence. Generic praise ("great teacher") reads
 * fake; specific detail reads true.
 */

export interface Testimonial {
  quote: string;
  name: string;
  /** Photo under /public/students/. Empty = neutral avatar. */
  photo: string;
  program: string;
  year: string;
  /** Where they are now — the part that proves the outcome. */
  now: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'I built my first full website in the live class and used it as my project in placement interviews.',
    name: 'Aman Tiwari',
    photo: '/images/students/aman.png',
    program: 'Web Development',
    year: '2021',
    now: 'Frontend Developer',
  },
  {
    quote:
      'The English classes changed how I speak in interviews. That mattered more than any certificate.',
    name: 'Raj Dubey',
    photo: '/images/students/raj.png',
    program: 'Communication & Personality',
    year: '2021',
    now: 'B.Tech final year',
  },
  {
    quote:
      'Pandas felt impossible until the live series. Sir taught the same thing three ways until it clicked.',
    name: 'Prabhjot Kaur',
    photo: '/images/students/prabhjot.png',
    program: 'Data & Python',
    year: '2020',
    now: 'Data Analyst',
  },
];
