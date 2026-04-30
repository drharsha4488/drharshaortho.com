'use client';
import { motion } from 'motion/react';

/**
 * Reveal — scroll-triggered fade-up animation wrapper.
 * Respects prefers-reduced-motion via the global CSS rule in globals.css.
 *
 * Usage:
 *   <Reveal>...</Reveal>
 *   <Reveal delay={0.15}>...</Reveal>
 *   <Reveal as="li" y={40}>...</Reveal>
 */
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 24,
  duration = 0.6,
  className = '',
  once = true,
  ...rest
}) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/**
 * RevealStagger — animate a list of children with a staggered cascade.
 * Wrap each child in <RevealItem> for proper sequencing.
 */
export function RevealStagger({ children, stagger = 0.08, delay = 0, className = '', ...rest }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, y = 20, duration = 0.5, className = '', as = 'div', ...rest }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
