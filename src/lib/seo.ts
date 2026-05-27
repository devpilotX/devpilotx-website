import type { Metadata } from 'next';
import { site } from '@/content/site';

export function buildMetadata(args: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const title = args.title ? `${args.title} | ${site.name}` : `${site.name} — ${site.role}, ${site.ownerName}`;
  const description = args.description ?? site.tagline;
  const url = `${site.url}${args.path ?? ''}`;
  const image = args.image ?? `${site.url}/og.png`;
  return {
    title,
    description,
    metadataBase: new URL(site.url),
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: site.name,
      images: [{ url: image, width: 1200, height: 630, alt: title }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image]
    },
    icons: { icon: '/favicon.svg' },
    robots: { index: true, follow: true }
  };
}
