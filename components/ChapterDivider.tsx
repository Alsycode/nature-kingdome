"use client";
import { motion } from "motion/react";

interface ChapterDividerProps {
  number: string;
  title: string;
  subtitle: string;
  quote?: string;
  height?: string;
}

export default function ChapterDivider({
  number,
  title,
  subtitle,
  quote,
  height = "py-44 sm:py-56"
}: ChapterDividerProps) {
  return (
    <div className={`w-full flex flex-col items-center justify-center bg-surface relative overflow-hidden ${height} px-6`}>
      {/* Absolute micro vertical line */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
        className="w-[1px] h-24 bg-[#e9c349]/20 mb-12 origin-top"
      />

      <div className="text-center max-w-3xl space-y-6 z-10">
        {/* Chapter marker */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
          className="text-xs tracking-[0.4em] font-mono text-[#e9c349]/80 uppercase block"
        >
          Act {number} — {subtitle}
        </motion.span>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.4, delay: 0.1, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
          className="font-headline text-4xl sm:text-6xl text-on-surface tracking-tight font-light"
        >
          {title}
        </motion.h3>

        {/* Optional poetic quote block */}
        {quote && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.8, delay: 0.3 }}
            className="font-headline italic text-sm sm:text-base text-on-surface/50 max-w-lg mx-auto pt-4 leading-relaxed tracking-wide"
          >
            "{quote}"
          </motion.p>
        )}
      </div>

      {/* Decorative background absolute layout markers */}
      <span className="absolute left-10 bottom-6 text-[8px] font-mono tracking-[0.4em] text-on-surface/10 uppercase select-none pointer-events-none">
        NATURE KINGDOM CHRONICLES
      </span>
      <span className="absolute right-10 bottom-6 text-[8px] font-mono tracking-[0.4em] text-[#e9c349]/10 uppercase select-none pointer-events-none">
        0{number} / 05
      </span>
    </div>
  );
}
