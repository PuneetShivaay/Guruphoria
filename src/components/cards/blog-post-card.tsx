import Image from 'next/image';
import { Newspaper } from 'lucide-react';
import type { BlogPost } from '@/lib/medium';
import { cn } from '@/lib/utils';

/**
 * BlogPostCard — one Medium article, fetched live (see src/lib/medium.ts).
 *
 * Horizontal layout, matching Medium's own article-list rows: metadata,
 * title and summary on the left; a small cover thumbnail on the right.
 * Stacks to a vertical card on narrow screens, where a side-by-side row
 * would cramp the image too small to read.
 *
 * No placeholder cover image: if Medium's RSS entry has no image, the row
 * simply has no thumbnail column rather than a stock photo standing in for
 * real content.
 */
export function BlogPostCard({
  post,
  className,
}: {
  post: BlogPost;
  className?: string;
}) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'card-hairline group flex flex-col gap-5 overflow-hidden p-5 sm:flex-row sm:items-center sm:gap-6',
        className,
      )}
    >
      <div className="flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-500">
          {post.categories[0] ?? 'Blog'} {post.publishedAt && `· ${post.publishedAt}`}
        </p>
        <h3 className="mt-2 text-lg font-semibold leading-snug text-brand-700 transition group-hover:text-brand-500">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-foreground/60">
          {post.summary}
        </p>
        <p className="mt-4 text-sm font-semibold text-brand-500">Read on Medium →</p>
      </div>

      <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-brand-100 to-brand-200 sm:w-44 md:w-56">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 224px"
            unoptimized
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center">
            <Newspaper className="h-7 w-7 text-brand-500/40" />
          </span>
        )}
      </div>
    </a>
  );
}
