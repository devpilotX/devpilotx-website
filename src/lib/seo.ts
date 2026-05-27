import type { Metadata } from 'next';
import { site } from '@/content/site';

export function buildMetadata({
  title,
  description,
  path = '/',
  ogImage
}: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  const url = new URL(path, site.url).toString();
  const image = ogImage || site.url + '/og-default.png';
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
      images: [image],
      creator: site.twitter
    }
  };
}
