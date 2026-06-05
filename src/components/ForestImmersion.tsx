import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function ForestImmersion() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax scroll effects for the full-bleed background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["20px", "-20px"]);

  return (
    <section
      ref={containerRef}
      className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background with parallax scroll scaling */}
      <div className="absolute inset-0 z-0">
        <motion.div style={{ y: bgY }} className="absolute -top-[15%] -bottom-[15%] left-0 right-0">
          <img
            alt="Enchanting forest mist view from Balcony Sanctuary"
            className="w-full h-full object-cover brightness-60 contrast-95"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4C0mh62WXjl8chvz213_fS-kVlSpNZYp9XWItOqgbiUnA9EwPmnUzISVWcUKcqlz_hWDUjHPIMr23c1iQTGCQhnwC_5YlXaheE7Awgj8G_URxNzZ2046OdC6aJPdcFMcTxxay0Vxwqmjsvla-7w-GF5iWmBjrFPL_DjytyM7hjz27Y1ugHcSJ9zuVOjmoRag1-fibKpFxUBK6kvYrvpUHsT-fUel1tLrFG5Mc8zcHNh14LhYfogKWmxtTb7ZYcuufBV6zkISciRKN"
          />
        </motion.div>
        {/* Subtle cinematic overlays */}
        <div className="absolute inset-0 bg-surface/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/60 via-transparent to-surface/60" />
      </div>

      {/* Floating Centered Narrative details */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 text-center max-w-4xl px-6 space-y-6"
      >
        <span className="text-xs sm:text-sm tracking-[0.4em] font-semibold text-[#e9c349] uppercase block font-sans">
          The Experience
        </span>
        <h2 className="font-headline text-4xl sm:text-6xl lg:text-7xl text-on-surface leading-tight font-medium">
          Wake Up Inside The Forest.
        </h2>
        <p className="font-sans font-light text-base sm:text-lg lg:text-xl text-on-surface/80 max-w-2xl mx-auto leading-relaxed">
          Breathe the unfiltered mountain air. Listen to the dawn chorus of the jungle canopy. Your expansive private balcony is a private theater of the wild, untamed world.
        </p>

        {/* Decorative thin gold line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="w-12 h-[1px] bg-[#e9c349]/40 mx-auto mt-8 origin-center"
        />
      </motion.div>
    </section>
  );
}
