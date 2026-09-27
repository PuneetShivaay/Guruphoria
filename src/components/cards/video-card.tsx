import Link from 'next/link';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { Chip } from '@/components/common/section';
import type { ArchiveVideo } from '@/content/archive';
import { site } from '@/content/site';
import { cn } from '@/lib/utils';

/**
 * VideoCard — one lesson from the archive.
 *
 * The year is always shown. A 2021 date alongside a 55-minute runtime reads as
 * a real teaching session; hiding the date would read as concealment.
 */
export function VideoCard({
  video,
  className,
}: {
  video: ArchiveVideo;
  className?: string;
}) {
  const href = video.videoId
    ? `https://www.youtube.com/watch?v=${video.videoId}`
    : site.social.youtube;

  const thumbnail = video.videoId
    ? `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`
    : null;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('card-hairline group flex flex-col overflow-hidden', className)}
    >
      <div className="relative flex aspect-video items-end bg-gradient-to-br from-brand-100 to-brand-200 p-3">
        {thumbnail && (
          <Image
            src={thumbnail}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 380px"
          />
        )}

        {video.isLive && (
          <span className="absolute left-3 top-3 z-10 rounded bg-live px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-live-foreground">
            Live class
          </span>
        )}

        <span className="absolute inset-0 z-10 grid place-items-center">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white/90 shadow-elevated transition group-hover:scale-110">
            <Play className="h-4 w-4 fill-brand-700 text-brand-700" />
          </span>
        </span>

        <span className="relative z-10 rounded bg-brand-900/85 px-2 py-1 text-[10px] font-semibold text-white">
          {video.duration}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-500">
          {video.programLabel} · {video.year}
        </p>
        <h3 className="mt-2 flex-1 font-semibold leading-snug text-brand-700">
          {video.title}
        </h3>
        <div className="mt-4">
          <Chip>{video.language}</Chip>
        </div>
      </div>
    </Link>
  );
}
