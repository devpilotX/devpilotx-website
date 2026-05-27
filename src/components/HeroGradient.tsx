'use client';

import { motion } from 'framer-motion';

const meshInitial = { opacity: 0, scale: 0.96 };
const meshAnimate = { opacity: 1, scale: 1 };
const meshTransition = { duration: 1.2, ease: 'easeOut' as const };

const conicAnimate = { rotate: 360 };
const conicTransition = { duration: 60, ease: 'linear' as const, repeat: Infinity };

const meshStyle = {
  background:
    'radial-gradient(closest-side, rgba(99,102,241,0.45), rgba(6,182,212,0.25) 50%, transparent 80%)'
};
const conicStyle = {
  background:
    'conic-gradient(from 90deg, rgba(99,102,241,0.18), rgba(6,182,212,0.08), rgba(217,70,239,0.18), rgba(99,102,241,0.18))',
  filter: 'blur(40px)'
};
const lineStyle = {
  background:
    'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)'
};

export default function HeroGradient() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        initial={meshInitial}
        animate={meshAnimate}
        transition={meshTransition}
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-[640px] w-[1200px] rounded-full blur-3xl"
        style={meshStyle}
      />
      <motion.div
        animate={conicAnimate}
        transition={conicTransition}
        className="absolute left-1/2 top-32 -translate-x-1/2 h-[520px] w-[520px] rounded-full opacity-40"
        style={conicStyle}
      />
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={lineStyle}
      />
    </div>
  );
}
