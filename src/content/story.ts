/**
 * Our Story — 2020 Lucknow classroom → pause → 2026 relaunch.
 *
 * Vragger and the Foundation are told here in PAST TENSE, with pride.
 * Neither is live, so neither appears in the navigation.
 *
 * TODO(puneet): drop archive photographs into /public/story/ and fill in
 * the `photos` array — classroom, whiteboard, computers, Teachers' Day.
 */

export interface TimelineEntry {
  year: string;
  title: string;
  body: string;
}

export const timeline: TimelineEntry[] = [
  {
    year: '2020',
    title: 'A classroom in Gomti Nagar',
    body: 'Guruphoria opens as an offline computer institute in Vikas Khand, Lucknow. Over 200 students pass through the room.',
  },
  {
    year: '2020–21',
    title: 'The pandemic pivot',
    body: 'Classes move online. 21 live streams and 63 videos later, we build Vragger — our own student Q&A platform where learners asked and answered each other.',
  },
  {
    year: '2021',
    title: 'The Foundation',
    body: 'Free seats for students who could not afford fees, and a book bank where students donated textbooks for others to borrow. It is why everything we do is still free.',
  },
  {
    year: '2026',
    title: 'Chapter Two',
    body: 'Guruphoria returns — online, mentor-led, and open to anyone. Career skills plus a growing AI track.',
  },
];

export interface StoryPhoto {
  src: string;
  caption: string;
}

export const storyPhotos: StoryPhoto[] = [
  { src: '', caption: 'Classroom, 2020' },
  { src: '', caption: "Teachers' Day" },
  { src: '', caption: 'Whiteboard session' },
  { src: '', caption: 'Lab setup' },
];
