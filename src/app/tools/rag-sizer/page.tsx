import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import RagSizer from '@/components/tools/RagSizer';
import { buildMetadata } from '@/lib/seo';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = buildMetadata({
  title: 'RAG sizing & cost',
  description: 'Plan a retrieval system: chunks, vector dimensions, embedding cost, vector DB size, and monthly storage cost across Pinecone, pgvector, and Chroma.',
  path: '/tools/rag-sizer'
});

export default function Page() {
  return (
    <Container className="py-16 sm:py-20">
      <Link href="/tools" className="inline-flex items-center gap-1.5 text-sm text-fg-dim hover:text-fg mb-8"><ArrowLeft size={14} /> All tools</Link>
      <SectionHeading
        eyebrow="AI toolkit"
        title="RAG sizing & cost"
        description="Plan a retrieval system end to end. Inputs are document count, average length, chunk size and overlap, and embedding model. Outputs are chunks, vector DB size at float32, one-time embedding cost, and a monthly cost estimate across three popular hosts."
      />
      <div className="mt-10"><RagSizer /></div>
    </Container>
  );
}
