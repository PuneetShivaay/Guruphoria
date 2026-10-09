import type { Metadata } from 'next';
import { Newspaper } from 'lucide-react';
import { PageHero } from '@/components/common/page-hero';
import { Section } from '@/components/common/section';
import { BlogPostCard } from '@/components/cards/blog-post-card';
import { fetchLatestPosts } from '@/lib/medium';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    "Writing on technology, teaching and building Guruphoria — from Puneet Shivaay's Medium.",
};

/**
 * Blog — live posts fetched server-side from the real Medium feed.
 *
 * No hardcoded articles, no mock-data fallback. If the feed is empty or
 * unreachable, we say so honestly rather than inventing content. See
 * src/lib/medium.ts for the fetch + honesty rules.
 */
export default async function BlogPage() {
  const posts = await fetchLatestPosts(4);

  return (
    <>
      <PageHero
        label="Blog"
        title={
          <>
            Notes on building
            <span className="text-brand-gradient"> Guruphoria.</span>
          </>
        }
        intro="Writing on technology, teaching and the long way from a Lucknow classroom to here — published on Medium, mirrored here."
      />

      <Section tone="surface">
        {posts.length > 0 ? (
          <div className="flex flex-col gap-5">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border py-20 text-center">
            <Newspaper className="h-8 w-8 text-brand-500/40" />
            <p className="max-w-sm text-sm text-foreground/60">
              New posts are not available right now. In the meantime, read
              everything on Medium directly.
            </p>
            <a
              href={site.social.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-brand-500 hover:text-brand-700"
            >
              Visit the Medium page →
            </a>
          </div>
        )}
      </Section>
    </>
  );
}
