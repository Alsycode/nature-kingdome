import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
const heroVideo = "/assets/herovid.mp4";

interface HeroProps {
  onBeginJourneyClick?: () => void;
}

export default function Hero({ onBeginJourneyClick }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax effect on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0px", "-60px"]);

  const titleWords = ["FIND", "PEACE.", "REDISCOVER", "LIFE."];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black lg:-ml-20 lg:w-screen"
      id="hero"
    >
      {/* Background video with subtle parallax and minimal dark vignette */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 z-0 scale-105">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/golden_hour_hike.png"
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover", objectPosition: "center" }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/15 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/20" />
      </motion.div>

      {/* Main Hero Content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 text-center flex flex-col items-center mt-20 px-6 max-w-5xl mx-auto"
      >
        {/* Top visual microbar */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
          className="w-16 h-[1px] bg-[#e9c349]/50 mb-8"
        />

        <h1 className="font-headline text-4xl sm:text-5xl lg:text-7xl leading-[1.05] tracking-tight text-on-surface mb-6">
          {titleWords.map((word, index) => (
            <span key={index} className="inline-block overflow-hidden mr-4 last:mr-0 py-1">
              <motion.span
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  delay: 0.3 + index * 0.15,
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
              {index === 1 && <br className="hidden sm:inline" />}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 1.4, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
          className="font-sans font-light text-sm sm:text-base lg:text-lg text-on-surface/80 max-w-xl mx-auto mb-10 tracking-wide leading-relaxed"
        >
          Hidden among the ancient forests of Chikkamagaluru lies a private retreat where
          nature, raw materials, silence, and luxury coexist in perfect harmony.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 1.2, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
        >
          <a
            onClick={onBeginJourneyClick}
            href="#arrival"
            className="btn-editorial inline-block px-12 py-4 text-xs font-semibold tracking-[0.25em] text-[#e9c349]"
          >
            Begin The Journey
          </a>
        </motion.div>
      </motion.div>

      {/* Luxury Bottom Decor */}
      <div className="absolute bottom-10 left-10 lg:left-32 z-20 hidden sm:flex items-center space-x-6 text-[10px] tracking-[0.25em] uppercase text-on-surface/40">
        <span>01</span>
        <div className="w-12 h-[1px] bg-on-surface/20" />
        <span>06</span>
        <span className="text-[#e9c349]/70">The Prologue</span>
      </div>

      <div className="absolute bottom-10 right-10 z-20 hidden sm:flex items-center space-x-3 text-[10px] tracking-[0.2em] uppercase text-on-surface/40">
        <span className="animate-bounce">↓</span>
        <span>Scroll to Explore</span>
      </div>
    </section>
  );
}
