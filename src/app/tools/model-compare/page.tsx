import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import ModelCompare from '@/components/tools/ModelCompare';
import { buildMetadata } from '@/lib/seo';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = buildMetadata({
  title: 'LLM model comparison',
  description: 'Sortable matrix of frontier LLMs: context window, max output, modality, and pricing across OpenAI, Anthropic, Google, DeepSeek, Mistral, Meta, Alibaba, and xAI.',
  path: '/tools/model-compare'
});

export default function Page() {
  return (
    <Container className="py-16 sm:py-20">
      <Link href="/tools" className="inline-flex items-center gap-1.5 text-sm text-fg-dim hover:text-fg mb-8"><ArrowLeft size={14} /> All tools</Link>
      <SectionHeading
        eyebrow="AI toolkit"
        title="LLM model comparison"
        description="Frontier, workhorse, fast, and value tiers across eight providers. Sort by any column. Pricing is per 1M tokens, refreshed for late 2025."
      />
      <div className="mt-10"><ModelCompare /></div>
    </Container>
  );
}
