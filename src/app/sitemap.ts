import { MetadataRoute } from 'next';
import { readStore } from '@/lib/store';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://christformedchurch.org';
  const store = readStore();

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/events',
    '/sermons',
    '/ministries',
    '/gallery',
    '/prayer',
    '/give',
    '/sponsors',
    '/contact',
    '/announcements',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? ('daily' as const) : ('weekly' as const),
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic Ministry routes
  const ministryRoutes = store.ministries.map((m) => ({
    url: `${baseUrl}/ministries/${m.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...ministryRoutes];
}
