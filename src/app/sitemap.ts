import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { projects } from '@/content/projects';
import { posts } from '@/content/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    '/',
    '/about',
    '/projects',
    '/services',
    '/resume',
    '/blog',
    '/contact',
    '/legal/privacy',
    '/legal/terms',
    '/legal/cookies'
  ];
  const base: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: new URL(path, site.url).toString(),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.7
  }));
  const proj: MetadataRoute.Sitemap = projects.map((p) => ({
    url: new URL('/projects/' + p.slug, site.url).toString(),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6
  }));
  const blog: MetadataRoute.Sitemap = posts.map((p) => ({
    url: new URL('/blog/' + p.slug, site.url).toString(),
    lastModified: new Date(p.date),
    changeFrequency: 'monthly',
    priority: 0.5
  }));
  return [...base, ...proj, ...blog];
}
