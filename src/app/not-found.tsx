import Link from 'next/link';
import { Container } from '@/components/Container';

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <p className="text-sm uppercase tracking-widest text-brand-600 dark:text-brand-400">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-white">Page not found</h1>
      <p className="mt-3 text-base text-slate-600 dark:text-slate-300">That page does not exist or has moved.</p>
      <div className="mt-8">
        <Link href="/" className="btn-primary">Back to home</Link>
      </div>
    </Container>
  );
}
