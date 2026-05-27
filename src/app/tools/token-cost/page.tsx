import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import TokenCostCalculator from '@/components/tools/TokenCostCalculator';
import { buildMetadata } from '@/lib/seo';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = buildMetadata({
  title: 'Token & cost calculator',
  description: 'Estimate tokens and per-call cost across GPT-5, Claude 4.5, Gemini 2.5, DeepSeek, Mistral, Llama, Qwen, and Grok.',
  path: '/tools/token-cost'
});

export default function Page() {
  return (
    <Container className="py-16 sm:py-20">
      <Link href="/tools" className="inline-flex items-center gap-1.5 text-sm text-fg-dim hover:text-fg mb-8"><ArrowLeft size={14} /> All tools</Link>
      <SectionHeading
        eyebrow="AI toolkit"
        title="Token & cost calculator"
        description="Paste a prompt, choose a model, and see token counts plus the cost per call, per 1000 calls, and per million calls. Estimates use a character-per-token heuristic that is within ~10% of the real tokenizer for English prose."
      />
      <div className="mt-10"><TokenCostCalculator /></div>
    </Container>
  );
}
