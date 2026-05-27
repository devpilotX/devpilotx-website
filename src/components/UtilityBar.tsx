import Link from 'next/link';
import { site } from '@/content/site';
import Container from './Container';
import { ArrowRight } from 'lucide-react';

export default function UtilityBar() {
  return (
    <div className="hidden md:block border-b border-border">
      <Container as="div" className="flex h-9 items-center justify-between text-[11.5px] text-fg-muted">
        <div className="flex items-center gap-5">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-soft" />
            <span className="text-fg-dim">Available for new engagements</span>
          </span>
          <span className="text-fg-muted/70">Ambala, India · Remote worldwide</span>
          <span className="text-fg-muted/70 hidden lg:inline">Independent studio</span>
        </div>
        <div className="flex items-center gap-4">
          <a href={'mailto:' + site.email.hello} className="hover:text-fg transition-colors">{site.email.hello}</a>
          <span className="h-3 w-px bg-fg/15" />
          <Link href="/contact" className="inline-flex items-center gap-1 hover:text-fg transition-colors">Start a project <ArrowRight size={11} /></Link>
        </div>
      </Container>
    </div>
  );
}
