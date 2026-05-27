import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import PromptDiff from '@/components/tools/PromptDiff';
import { buildMetadata } from '@/lib/seo';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = buildMetadata({
  title: 'Prompt diff',
  description: 'Word-level diff between two prompts. See token counts on each side and the delta. Useful for catching prompt drift across iterations.',
  path: '/tools/prompt-diff'
});

export default function Page() {
  return (
    <Container className="py-16 sm:py-20">
      <Link href="/tools" className="inline-flex items-center gap-1.5 text-sm text-fg-dim hover:text-fg mb-8"><ArrowLeft size={14} /> All tools</Link>
      <SectionHeading
        eyebrow="AI toolkit"
        title="Prompt diff"
        description="Paste two versions of a prompt side by side. See a clean word-level diff, token counts for each version, and the token delta. Great for tracking prompt drift across iterations."
      />
      <div className="mt-10"><PromptDiff /></div>
    </Container>
  );
}
