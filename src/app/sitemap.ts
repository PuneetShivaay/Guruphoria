import { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { programs } from '@/content/programs';

export const dynamic = 'force-static';

/**
 * Sitemap for the 2026 information architecture.
 * Program detail pages are generated from content so the sitemap can never
 * fall out of sync with what actually exists.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString();

  const staticRoutes: Array<{ path: string; priority: number }> = [
    { path: '', priority: 1 },
    { path: '/programs', priority: 0.9 },
    { path: '/live', priority: 0.9 },
    { path: '/mentors', priority: 0.8 },
    { path: '/story', priority: 0.8 },
    { path: '/contact', priority: 0.6 },
  ];

  const programRoutes = programs.map((p) => ({
    path: `/programs/${p.slug}`,
    priority: 0.7,
  }));

  return [...staticRoutes, ...programRoutes].map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority,
  }));
}
