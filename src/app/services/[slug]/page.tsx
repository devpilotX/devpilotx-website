import { services } from '@/content/services';
import { buildMetadata } from '@/lib/seo';
import ServiceDetailClient from './ServiceDetailClient';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return buildMetadata({ title: 'Service', path: '/services' });
  return buildMetadata({
    title: service.name,
    description: service.tagline || service.oneLiner,
    path: '/services/' + service.slug
  });
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) {
    return (
      <div className="py-20 text-center text-fg-dim">Service not found.</div>
    );
  }
  return <ServiceDetailClient service={service} />;
}
