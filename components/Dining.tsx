"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
const menuImg = "/assets/menu.png";

interface DiningHighlight {
  title: string;
  description: string;
}

const highlights: DiningHighlight[] = [
  {
    title: "Breakfast",
    description: "Begin mornings with warm, stone-milled grains and fresh estate-ground spices, served precisely when the morning bird call ends."
  },
  {
    title: "Evening Snacks",
    description: "Pause in the late afternoon for toasted millet cakes and traditional roasted forest tubers, cooked slow over glowing coal embers."
  },
  {
    title: "Coffee & Tea",
    description: "Sample small-batch Arabica, hand-selected from our oldest blocks, paired with infusions of homegrown mountain lemongrass."
  },
  {
    title: "Vegetarian Dining",
    description: "Clean, delicate plant pairings sourced directly from our valley estates and neighboring smallholders, presenting raw earthy sweetness."
  },
  {
    title: "Non-Vegetarian Dining",
    description: "Thoughtfully prepared local poultry and heritage recipes, slow-simmered in hand-beaten copper pots with cold-pressed oils."
  }
];

export default function Dining() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={containerRef}
      id="dining"
      className="py-24 sm:py-32 lg:py-48 px-6 sm:px-12 lg:px-20 w-full bg-[#0a0a0a] relative overflow-hidden border-t border-on-surface/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col space-y-20 sm:space-y-36">

        {/* Editorial Title Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <span className="text-xs sm:text-sm tracking-[0.4em] font-semibold text-[#e9c349] uppercase block font-sans">
              The Nourishment
            </span>
            <h2 className="font-headline text-4xl sm:text-6xl lg:text-8xl leading-[1.05] tracking-tight text-on-surface">
              Simple Food. <br />
              <span className="font-sans font-light italic text-[#e9c349]">Extraordinary Setting.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pt-16">
            <p className="font-sans font-light text-base sm:text-lg text-on-surface/60 leading-relaxed italic border-l border-[#e9c349]/20 pl-6">
              Every meal at Nature Kingdom is designed to complement the pace of the forest.
            </p>
          </div>
        </div>

        {/* Immersive visual element with subtle parallax */}
        {/* aspect-[16/9] on mobile, aspect-[21/9] on lg — prevents a near-invisible image on small screens */}
        <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden brightness-90 shadow-2xl rounded-[1px]">
          <div className="absolute inset-0 border border-on-surface/5 pointer-events-none z-10" />
          <motion.img
            style={{ y: imgY }}
            alt="An intimate table set with simple, hand-thrown clay platters on a rustic teak slab deep within soft jungle shadows"
            className="absolute -top-[10%] -bottom-[10%] left-0 right-0 w-full h-full object-cover select-none scale-105"
            src={menuImg}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/40 to-transparent pointer-events-none" />
        </div>

        {/* Minimal Narrative list - highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 pt-4 sm:pt-8 items-start">
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-headline text-2xl sm:text-3xl text-on-surface font-medium">
              The Culinary Rhythm
            </h3>
            <p className="font-sans font-light text-sm sm:text-base text-on-surface/50 leading-relaxed">
              We reject noisy buffets and static restaurant menus. In their place is a quiet kitchen that honors regional Karnataka heritage, serving single, thoughtful plates shaped by local micro-seasons.
            </p>
          </div>

          {/* Highlights Stack */}
          <div className="lg:col-span-8 divide-y divide-on-surface/10">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="py-8 sm:py-10 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 group"
              >
                <div className="sm:col-span-4">
                  <h4 className="font-headline text-xl text-on-surface group-hover:text-[#e9c349] transition-colors duration-300">
                    {item.title}
                  </h4>
                </div>
                <div className="sm:col-span-8">
                  <p className="font-sans font-light text-sm sm:text-base text-on-surface/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
