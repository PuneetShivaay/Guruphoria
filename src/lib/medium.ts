import { XMLParser } from 'fast-xml-parser';

/**
 * Medium blog integration.
 *
 * Fetches directly from Medium's public RSS feed, server-side — no
 * third-party proxy (the previous implementation used rss2json.com, an
 * extra point of failure outside our control). CORS only applies to
 * browser fetches, so a Next.js Server Component can hit Medium directly.
 *
 * HONESTY RULE: if the feed is unreachable or empty, callers must show an
 * honest empty state. This module must never fabricate posts — the old
 * implementation's "mock article" fallback is exactly the kind of invented
 * content docs/ARCHITECTURE.md §6 forbids.
 */

const MEDIUM_FEED_URL = 'https://medium.com/feed/@puneetshivaay';

/** Revalidate once a day — the author posts infrequently, so there is no
 *  benefit to fetching more often than that. */
const REVALIDATE_SECONDS = 60 * 60 * 24;

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  url: string;
  publishedAt: string;
  /** ISO date, for sorting/formatting by the caller. */
  publishedAtISO: string;
  coverImage: string | null;
  categories: string[];
}

interface RawRssItem {
  title?: string | { __cdata?: string };
  link?: string;
  guid?: string | { '#text'?: string };
  pubDate?: string;
  description?: string | { __cdata?: string };
  'content:encoded'?: string | { __cdata?: string };
  category?: CdataValue | CdataValue[];
}

type CdataValue = string | { __cdata?: string };

const parser = new XMLParser({
  ignoreAttributes: false,
  cdataPropName: '__cdata',
});

/** Medium's feed wraps most text fields in CDATA, which fast-xml-parser
 *  surfaces as `{ __cdata: string }` rather than a plain string. */
function unwrapCdata(value: CdataValue | undefined): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value.__cdata ?? '';
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function firstImageSrc(html: string): string | null {
  const match = html.match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1] : null;
}

function summarize(text: string, maxLength = 160): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '…';
}

function toArray(value: CdataValue | CdataValue[] | undefined): string[] {
  if (!value) return [];
  const list = Array.isArray(value) ? value : [value];
  return list.map(unwrapCdata).filter(Boolean);
}

function guidToId(guid: RawRssItem['guid'], fallback: string): string {
  if (typeof guid === 'string') return guid;
  if (guid && typeof guid === 'object' && guid['#text']) return guid['#text'];
  return fallback;
}

/**
 * Fetches the latest posts from the Guruphoria Medium feed.
 *
 * Returns an empty array — never fabricated data — if the feed cannot be
 * read for any reason. Callers must render an honest "no posts yet" state
 * in that case, not placeholder content.
 */
export async function fetchLatestPosts(limit = 4): Promise<BlogPost[]> {
  try {
    const response = await fetch(MEDIUM_FEED_URL, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: 'application/rss+xml, application/xml, text/xml' },
    });

    if (!response.ok) {
      console.warn(`Medium feed returned ${response.status}`);
      return [];
    }

    const xml = await response.text();
    const data = parser.parse(xml);
    const items: RawRssItem[] = data?.rss?.channel?.item ?? [];

    if (!items.length) return [];

    return items.slice(0, limit).map((item, index) => {
      const contentHtml = unwrapCdata(item['content:encoded']);
      const descriptionHtml = unwrapCdata(item.description);
      const titleText = unwrapCdata(item.title) || 'Untitled';

      const plainSummary = stripHtml(descriptionHtml || contentHtml);
      const publishedDate = item.pubDate ? new Date(item.pubDate) : null;
      const fallbackId = item.link ?? `medium-post-${index}`;

      return {
        id: guidToId(item.guid, fallbackId),
        title: stripHtml(titleText),
        summary: summarize(plainSummary),
        url: item.link ?? 'https://puneetshivaay.medium.com/',
        publishedAt: publishedDate
          ? publishedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          : '',
        publishedAtISO: publishedDate ? publishedDate.toISOString() : '',
        coverImage: firstImageSrc(contentHtml || descriptionHtml),
        categories: toArray(item.category),
      };
    });
  } catch (error) {
    console.warn('Medium feed fetch failed:', error);
    return [];
  }
}
