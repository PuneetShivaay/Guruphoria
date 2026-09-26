import {
  ChapterTwo,
  Hero,
  Mentors,
  Newsletter,
  Programs,
  Proof,
  Story,
  TwoDoors,
} from '@/components/sections/home';

/**
 * Guruphoria homepage.
 *
 * Section order is deliberate and documented in docs/design/05-homepage-spec.md:
 * establish who we are (Hero) → why now (ChapterTwo) → who it's for (TwoDoors)
 * → what we teach (Programs) → who teaches (Mentors) → where we came from
 * (Story) → why believe us (Proof) → stay connected (Newsletter).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ChapterTwo />
      <TwoDoors />
      <Programs />
      <Mentors />
      <Story />
      <Proof />
      <Newsletter />
    </>
  );
}
