import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { projects } from '@/content/projects';
import { posts } from '@/content/posts';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, '');
  const now = new Date();

  const staticRoutes = [
    '/',
    '/about',
    '/projects',
    '/services',
    '/resume',
    '/contact',
    '/blog',
    '/tools',
    '/tools/token-cost',
    '/tools/model-compare',
    '/tools/rag-sizer',
    '/tools/prompt-diff',
    '/legal/privacy',
    '/legal/terms',
    '/legal/cookies'
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: base + path,
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.startsWith('/tools') ? 0.9 : 0.7
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((p) => ({
    url: base + '/projects/' + p.slug,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8
  }));

  const blogEntries: MetadataRoute.Sitemap = (posts ?? []).map((p) => ({
    url: base + '/blog/' + p.slug,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6
  }));

  return [...staticEntries, ...projectEntries, ...blogEntries];
}
