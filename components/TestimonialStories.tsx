"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { useState, useEffect, useCallback, useRef } from "react";

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  image_url: string;
}

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=900",
  "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=900",
  "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&q=80&w=900",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=900",
  "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=900",
];

/* ── Desktop carousel config (≥1024px only) ──────────────────────────── */
const POS_CONFIG: Record<
  number,
  { x: number; scale: number; zIndex: number; opacity: number }
> = {
  [-2]: { x: -490, scale: 0.78, zIndex: 10, opacity: 1 },
  [-1]: { x: -268, scale: 0.90, zIndex: 30, opacity: 1 },
  [0]:  { x: 0,    scale: 1.00, zIndex: 50, opacity: 1 },
  [1]:  { x: 268,  scale: 0.90, zIndex: 30, opacity: 1 },
  [2]:  { x: 490,  scale: 0.78, zIndex: 10, opacity: 1 },
};

const OFF_SCREEN_LEFT  = { x: -820, scale: 0.70, zIndex: 0, opacity: 0 };
const OFF_SCREEN_RIGHT = { x:  820, scale: 0.70, zIndex: 0, opacity: 0 };

function getRelativePos(index: number, active: number, total: number): number {
  let pos = ((index - active) % total + total) % total;
  if (pos > Math.floor(total / 2)) pos -= total;
  return pos;
}

const CARD_W  = 340;
const CARD_H  = 520;
const AUTOPLAY_MS = 6000;

export default function TestimonialStories() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [active, setActive]       = useState(0);
  const [isPaused, setIsPaused]   = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const totalRef = useRef(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((data: Testimonial[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
          totalRef.current = data.length;
        }
      })
      .catch(() => {});
  }, []);

  const advance = useCallback(() => {
    setActive((p) => (p + 1) % totalRef.current);
    setProgressKey((k) => k + 1);
  }, []);

  const retreat = useCallback(() => {
    setActive((p) => (p - 1 + totalRef.current) % totalRef.current);
    setProgressKey((k) => k + 1);
  }, []);

  const goTo = useCallback((i: number) => {
    setActive(i);
    setProgressKey((k) => k + 1);
  }, []);

  useEffect(() => {
    clearTimeout(timerRef.current);
    if (isPaused) return;
    timerRef.current = setTimeout(advance, AUTOPLAY_MS);
    return () => clearTimeout(timerRef.current);
  }, [advance, isPaused, active]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 44) {
      delta > 0 ? advance() : retreat();
    }
    touchStartX.current = null;
  }

  if (testimonials.length === 0) return null;

  return (
    <section className="relative w-full bg-[#050505] pt-20 pb-16 overflow-hidden">

      {/* ── HEADER ─────────────────────────────────────────────────── */}

      {/* Desktop header (≥768px) */}
      <div className="hidden sm:flex px-8 sm:px-12 lg:px-20 mb-16 items-start justify-between">
        <div className="flex items-start gap-0">
          <div className="space-y-3 max-w-[280px]">
            <p className="font-sans text-[9px] tracking-[0.35em] uppercase text-[#C8A97E]/60">
              Whispers from the Sanctuary
            </p>
            <h2 className="font-headline text-5xl text-[#F4E7D6] leading-[1.1] tracking-tight">
              Memories that<br />stay with you
            </h2>
          </div>

          <div className="w-px self-stretch mx-10 bg-[#C8A97E]/30" style={{ marginTop: 28, height: 80 }} />

          <p className="font-sans font-light text-sm text-white/60 leading-relaxed max-w-[200px] mt-7">
            Real stories from real travelers.<br />
            Moments they'll never forget,<br />
            shared in their own words.
          </p>
        </div>

        <button className="relative w-[96px] h-[96px] rounded-full border border-[#C8A97E]/35 flex items-center justify-center group hover:border-[#C8A97E]/70 transition-colors duration-400 flex-shrink-0">
          <span
            className="absolute w-1.5 h-1.5 rounded-full bg-[#C8A97E]"
            style={{ top: 10, right: 26 }}
          />
          <span className="font-sans text-[9px] tracking-[0.22em] uppercase text-[#C8A97E] text-center leading-[1.6]">
            View All<br />Stories
          </span>
        </button>
      </div>

      {/* Mobile header (<768px) */}
      <div className="sm:hidden px-6 mb-10 space-y-3">
        <p className="font-sans text-[9px] tracking-[0.35em] uppercase text-[#C8A97E]/60">
          Whispers from the Sanctuary
        </p>
        <h2 className="font-headline text-4xl text-[#F4E7D6] leading-[1.1] tracking-tight">
          Memories that<br />stay with you
        </h2>
        <p className="font-sans font-light text-sm text-white/55 leading-relaxed pt-1">
          Real stories from real travelers.
        </p>
      </div>

      {/* ── DESKTOP CAROUSEL (≥1024px) ─────────────────────────────── */}
      <div className="hidden lg:block">
        <div
          className="relative flex items-center justify-center"
          style={{ height: CARD_H + 60 }}
        >
          {/* Left nav */}
          <button
            onClick={retreat}
            aria-label="Previous testimonial"
            className="absolute left-8 z-[60] w-11 h-11 rounded-full border border-[#C8A97E]/35 flex items-center justify-center hover:border-[#C8A97E]/80 hover:bg-[#C8A97E]/8 transition-all duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2.5L4.5 7L9 11.5" stroke="#C8A97E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Cards */}
          {testimonials.map((t, i) => {
            const pos    = getRelativePos(i, active, testimonials.length);
            const config = pos in POS_CONFIG
              ? POS_CONFIG[pos]
              : pos < 0 ? OFF_SCREEN_LEFT : OFF_SCREEN_RIGHT;

            const isCenter = pos === 0;

            return (
              <motion.div
                key={t.id}
                animate={{
                  x:       config.x,
                  scale:   config.scale,
                  opacity: config.opacity,
                  zIndex:  config.zIndex,
                }}
                transition={{
                  duration: 1.0,
                  ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
                  zIndex: { duration: 0 },
                }}
                style={{
                  position: "absolute",
                  width:     CARD_W,
                  height:    CARD_H,
                  zIndex:    config.zIndex,
                  cursor:    isCenter ? "default" : "pointer",
                }}
                onClick={() => { if (!isCenter) goTo(i); }}
              >
                <div
                  className="relative w-full h-full overflow-hidden"
                  style={{
                    borderRadius: 14,
                    border: isCenter
                      ? "1px solid rgba(200,169,126,0.45)"
                      : "1px solid rgba(200,169,126,0.14)",
                  }}
                >
                  <Image
                    src={t.image_url || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]}
                    alt={t.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    className="object-cover"
                    draggable={false}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(160deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.82) 100%)" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "rgba(55,28,5,0.38)", mixBlendMode: "multiply" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "radial-gradient(ellipse at 50% 40%, transparent 35%, rgba(0,0,0,0.55) 100%)" }}
                  />
                  <div className="absolute inset-0 flex flex-col justify-between p-8">
                    <div
                      className="font-headline leading-none text-[#C8A97E]"
                      style={{ fontSize: 72, opacity: 0.75, lineHeight: 0.8 }}
                    >
                      "
                    </div>
                    <div className="space-y-5">
                      <p
                        className="font-headline text-[#F4E7D6] leading-snug"
                        style={{ fontSize: isCenter ? 22 : 18 }}
                      >
                        {t.quote}
                      </p>
                      <div className="w-7" style={{ height: 1, background: "rgba(200,169,126,0.55)" }} />
                      <div>
                        <p className="font-sans text-[13px] font-medium text-[#F4E7D6]">{t.name}</p>
                        <p
                          className="font-sans uppercase text-[#C8A97E]/65 mt-1"
                          style={{ fontSize: 9, letterSpacing: "0.28em" }}
                        >
                          {t.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Right nav */}
          <button
            onClick={advance}
            aria-label="Next testimonial"
            className="absolute right-8 z-[60] w-11 h-11 rounded-full border border-[#C8A97E]/35 flex items-center justify-center hover:border-[#C8A97E]/80 hover:bg-[#C8A97E]/8 transition-all duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 2.5L9.5 7L5 11.5" stroke="#C8A97E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Desktop bottom controls */}
        <div className="px-12 lg:px-20 mt-10 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span
              className="font-sans uppercase text-[#C8A97E]/45"
              style={{ fontSize: 8, letterSpacing: "0.38em" }}
            >
              Autoplaying Stories
            </span>
            <div className="relative w-36 h-px bg-[#C8A97E]/18">
              <motion.div
                key={progressKey}
                className="absolute left-0 top-0 h-full bg-[#C8A97E]"
                initial={{ width: "0%" }}
                animate={{ width: isPaused ? "0%" : "100%" }}
                transition={{ duration: isPaused ? 0 : AUTOPLAY_MS / 1000, ease: "linear" }}
              />
              <motion.div
                key={`dot-${progressKey}`}
                className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#C8A97E]"
                initial={{ left: "0%" }}
                animate={{ left: isPaused ? "0%" : "100%" }}
                transition={{ duration: isPaused ? 0 : AUTOPLAY_MS / 1000, ease: "linear" }}
                style={{ marginLeft: -3 }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="transition-all duration-500"
                style={{
                  height: 1,
                  width:  i === active ? 36 : 22,
                  background: i === active ? "#C8A97E" : "rgba(200,169,126,0.28)",
                  display: "block",
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setIsPaused((p) => !p)}
            className="flex items-center gap-2 group transition-colors duration-200"
          >
            <span
              className="font-sans uppercase text-[#C8A97E]/50 group-hover:text-[#C8A97E] transition-colors duration-200"
              style={{ fontSize: 8, letterSpacing: "0.38em" }}
            >
              {isPaused ? "Play" : "Pause"}
            </span>
            {isPaused ? (
              <svg width="9" height="11" viewBox="0 0 9 11" fill="none">
                <path d="M1 1L8 5.5L1 10V1Z" fill="#C8A97E" fillOpacity="0.5" />
              </svg>
            ) : (
              <svg width="9" height="11" viewBox="0 0 9 11" fill="none">
                <rect x="1" y="1" width="2.5" height="9" fill="#C8A97E" fillOpacity="0.5" rx="0.5" />
                <rect x="5.5" y="1" width="2.5" height="9" fill="#C8A97E" fillOpacity="0.5" rx="0.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── MOBILE / TABLET CAROUSEL (<1024px) ─────────────────────── */}
      {/* Single-card swipe carousel. Swipe left/right to navigate. */}
      <div className="lg:hidden">
        <div
          className="relative overflow-hidden select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-label="Testimonials carousel"
          role="region"
        >
          {/* Slide track */}
          <div
            className="flex"
            style={{
              transform: `translateX(${-active * 100}%)`,
              transition: "transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
          >
            {testimonials.map((t, i) => (
              <div key={t.id} className="w-full flex-shrink-0 px-6">
                {/* Card */}
                <div
                  className="relative overflow-hidden"
                  style={{ borderRadius: 14, aspectRatio: "3/4", border: "1px solid rgba(200,169,126,0.35)" }}
                >
                  <Image
                    src={t.image_url || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]}
                    alt={t.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    className="object-cover"
                    draggable={false}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(160deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.85) 100%)" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "rgba(55,28,5,0.35)", mixBlendMode: "multiply" }}
                  />
                  <div className="absolute inset-0 flex flex-col justify-between p-7">
                    <div
                      className="font-headline leading-none text-[#C8A97E]"
                      style={{ fontSize: 64, opacity: 0.75, lineHeight: 0.8 }}
                    >
                      "
                    </div>
                    <div className="space-y-4">
                      <p className="font-headline text-[#F4E7D6] leading-snug text-xl">
                        {t.quote}
                      </p>
                      <div className="w-7" style={{ height: 1, background: "rgba(200,169,126,0.55)" }} />
                      <div>
                        <p className="font-sans text-sm font-medium text-[#F4E7D6]">{t.name}</p>
                        <p
                          className="font-sans uppercase text-[#C8A97E]/65 mt-1"
                          style={{ fontSize: 9, letterSpacing: "0.28em" }}
                        >
                          {t.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center justify-between px-6 mt-8">
          {/* Prev */}
          <button
            onClick={retreat}
            aria-label="Previous testimonial"
            className="w-11 h-11 rounded-full border border-[#C8A97E]/35 flex items-center justify-center hover:border-[#C8A97E]/70 transition-all duration-300 flex-shrink-0"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2.5L4.5 7L9 11.5" stroke="#C8A97E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex items-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="transition-all duration-500"
                style={{
                  height: 1,
                  width:  i === active ? 36 : 22,
                  background: i === active ? "#C8A97E" : "rgba(200,169,126,0.28)",
                  display: "block",
                }}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={advance}
            aria-label="Next testimonial"
            className="w-11 h-11 rounded-full border border-[#C8A97E]/35 flex items-center justify-center hover:border-[#C8A97E]/70 transition-all duration-300 flex-shrink-0"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 2.5L9.5 7L5 11.5" stroke="#C8A97E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Swipe hint */}
        <p className="text-center mt-5 text-[8px] tracking-[0.3em] font-sans uppercase text-[#C8A97E]/30">
          Swipe to explore stories
        </p>
      </div>

    </section>
  );
}
