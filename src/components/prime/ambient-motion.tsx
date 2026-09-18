'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

/** Keep the measuring section static; only its contents move. Never wrap a pinned section. */
export function ScrollSection({ children, className = '', id, effect = 'zoom' }: {
  children: ReactNode; className?: string; id?: string; effect?: 'zoom' | 'left' | 'right';
}) {
  const anchor = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: anchor, offset: ['start 98%', 'start 24%'] });
  const scale = useTransform(scrollYProgress, [0, 1], [effect === 'zoom' ? .955 : .985, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [effect === 'left' ? -36 : effect === 'right' ? 36 : 0, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [effect === 'zoom' ? 42 : 20, 0]);
  const opacity = useTransform(scrollYProgress, [0, .75, 1], [.3, 1, 1]);
  return <section id={id} ref={anchor} className="scroll-transition" data-scroll-effect={effect}>
    <motion.div className={className} style={reduced ? undefined : { scale, x, y, opacity, transformOrigin: '50% 35%' }}>{children}</motion.div>
  </section>;
}

/** A decorative light field: it never replaces the cursor or intercepts input. */
export function CursorBackdrop() {
  const [enabled, setEnabled] = useState(false);
  const pointerX = useMotionValue(-1000);
  const pointerY = useMotionValue(-1000);
  const visible = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 90, damping: 24, mass: .65 });
  const y = useSpring(pointerY, { stiffness: 90, damping: 24, mass: .65 });
  const opacity = useSpring(visible, { stiffness: 140, damping: 26 });
  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const sync = () => { setEnabled(query.matches); visible.set(0); };
    sync(); query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, [visible]);
  useEffect(() => {
    if (!enabled) return;
    let entered = false;
    const hide = () => { visible.set(0); entered = false; };
    const move = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      pointerX.set(event.clientX - 300); pointerY.set(event.clientY - 300);
      if (!entered) { x.jump(event.clientX - 300); y.jump(event.clientY - 300); entered = true; }
      visible.set(1);
    };
    const visibility = () => { if (document.hidden) hide(); };
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', hide);
      window.removeEventListener('blur', hide);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [enabled, pointerX, pointerY, visible, x, y]);
  if (!enabled) return null;
  return <div className="cursor-light-field" aria-hidden="true"><motion.div className="cursor-light" style={{ x, y, opacity }}/></div>;
}
