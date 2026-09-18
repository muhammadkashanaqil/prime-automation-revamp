'use client';

import { Children, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Motion stays opt-in until the browser confirms both room and preference.
export function useDesktopMotion() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px) and (min-height: 480px) and (prefers-reduced-motion: no-preference)');
    const sync = () => setEnabled(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);
  return enabled;
}

export function ScrollScene({ children, className = '', distance = 22 }: { children: ReactNode; className?: string; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useDesktopMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return <motion.div ref={ref} className={className} style={{ y: enabled ? y : 0 }}>{children}</motion.div>;
}

export function LineReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduced = useReducedMotion();
  return <span className="line-mask"><motion.span className="line-content" initial={reduced ? false : { y: '105%', opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .75, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.span></span>;
}

export function ProcessTrack({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 50%'] });
  return <div ref={ref} className="process-scroll-track"><div className="process-track-line" aria-hidden="true"><motion.span style={{ scaleX: reduced ? 1 : scrollYProgress }} /></div>{children}</div>;
}

// The dashboard is an illustration: contain the whole view inside the available
// panel instead of masking/cropping its lower half on laptop screens.
export function ProjectMedia({ children }: { children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    if (!box.current || !canvas.current) return;
    const measure = () => {
      const b = box.current!, c = canvas.current!;
      setScale(Math.min(1, b.clientWidth / Math.max(1, c.offsetWidth), b.clientHeight / Math.max(1, c.offsetHeight)));
    };
    const observer = new ResizeObserver(measure);
    observer.observe(box.current); observer.observe(canvas.current); measure();
    return () => observer.disconnect();
  }, []);
  return <div className="rail-dashboard" ref={box} style={{ '--dashboard-scale': scale } as CSSProperties}><div ref={canvas} className="project-dashboard-canvas">{children}</div></div>;
}

export function ScrollGallery({ heading, children }: { heading: ReactNode; children: ReactNode }) {
  const items = Children.toArray(children);
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const enabled = useDesktopMotion();
  const [metrics, setMetrics] = useState({ distance: 0, runway: 0, screen: 0 });
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  // Brief holds at either end let the first and last projects settle on screen.
  const travel = useTransform(scrollYProgress, [0, .06, .94, 1], [0, 0, 1, 1]);
  const x = useTransform(travel, [0, 1], [0, -metrics.distance]);
  useMotionValueEvent(travel, 'change', value => {
    if (enabled) setActive(Math.round(value * (items.length - 1)));
  });
  useEffect(() => {
    if (!viewport.current || !track.current) return;
    const measure = () => {
      const screen = window.innerHeight;
      const distance = Math.max(0, track.current!.scrollWidth - viewport.current!.clientWidth);
      // The sticky frame stays put for the full horizontal travel plus end holds.
      setMetrics({ distance, screen, runway: Math.max(distance, screen * (items.length - 1)) / .88 });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(viewport.current); observer.observe(track.current);
    window.addEventListener('resize', measure); measure();
    return () => { observer.disconnect(); window.removeEventListener('resize', measure); };
  }, [enabled, items.length]);
  useEffect(() => { if (viewport.current) viewport.current.scrollLeft = 0; }, [enabled]);
  function goTo(index: number, smooth = true) {
    const i = Math.max(0, Math.min(items.length - 1, index));
    if (enabled && section.current) {
      const top = section.current.getBoundingClientRect().top + window.scrollY;
      const progress = i === 0 ? 0 : i === items.length - 1 ? 1 : .06 + .88 * i / (items.length - 1);
      window.scrollTo({ top: top + metrics.runway * progress, behavior: smooth ? 'smooth' : 'instant' });
    } else if (viewport.current && track.current) {
      const item = track.current.children[i] as HTMLElement | undefined;
      if (item) viewport.current.scrollTo({ left: item.offsetLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
  }
  return <section id="selected-work" ref={section} aria-label="Selected projects" className={`selected-work scroll-gallery ${enabled ? 'is-pinned' : ''}`} style={enabled ? { height: metrics.screen + metrics.runway, '--gallery-screen': `${metrics.screen}px` } as CSSProperties : undefined}>
    <div className="gallery-sticky wrap">
      <div className="section-heading">{heading}<div className="rail-controls"><button disabled={active === 0} aria-label="Previous project" onClick={() => goTo(active - 1)}><ArrowRight style={{ transform: 'rotate(180deg)' }} size={19}/></button><button disabled={active === items.length - 1} aria-label="Next project" onClick={() => goTo(active + 1)}><ArrowRight size={19}/></button></div></div>
      <div ref={viewport} className="gallery-viewport" onScroll={() => { if (!enabled && viewport.current && track.current) { const left = viewport.current.scrollLeft; const entries = Array.from(track.current.children) as HTMLElement[]; const closest = entries.reduce((best, el, i) => Math.abs(el.offsetLeft - left) < Math.abs(entries[best].offsetLeft - left) ? i : best, 0); setActive(closest); } }}>
        <motion.div ref={track} className="gallery-track" style={{ x: enabled ? x : 0 }}>{items.map((item, i) => <div className="gallery-item" key={i} onFocus={() => { if (enabled && active !== i) goTo(i, false); }}>{item}</div>)}</motion.div>
      </div>
      <div className="gallery-footer"><span className="gallery-counter">{String(active + 1).padStart(2, '0')} <span>/ {String(items.length).padStart(2, '0')}</span></span><div className="gallery-progress" aria-hidden="true"><motion.span style={{ scaleX: enabled ? scrollYProgress : (active + 1) / items.length }}/></div><span className="gallery-hint">{enabled ? 'SCROLL TO EXPLORE' : 'EXPLORE THE PROJECTS'}</span></div>
    </div>
  </section>;
}
