"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
const menuImg = "/assets/menu.png";

interface DiningHighlight {
  title: string;
  subtitle?: string;
  items: string[];
  note?: string;
}

const highlights: DiningHighlight[] = [
  {
    title: "Morning Breeze Breakfast",
    subtitle: "8:30 AM – 10:00 AM",
    items: [
      "Set Dosa / Idly / Neer Dosa with Sambar & Chutney (any one)",
      "Lemon Rice / Pullav / Uppama",
      "Coffee · Tea · Milk",
    ],
  },
  {
    title: "Evening High Tea",
    items: [
      "Onion Pakoda / Vegetable Pakoda (any one)",
      "Coffee · Tea · Milk",
    ],
  },
  {
    title: "Sunset Delights Dinner",
    subtitle: "8:30 PM – 10:00 PM",
    items: [
      "Ghee Rice / Jeera Rice & Chapathi",
      "Chicken Fry · Chicken Gravy · Fish Fry — optional, subject to availability",
      "Veg: Dal / Rasam",
      "Paneer / Veg Kurma · Gobi · Sabaji · Papad · Curd Rice",
      "Sweets: Gulab Jamun / Payasa",
    ],
    note: "No lunch served. All food items are subject to availability.",
  },
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
              Every meal at Nature Kingdom is designed to complement the pace of the mountains.
            </p>
          </div>
        </div>

        {/* Immersive visual element with subtle parallax */}
        {/* aspect-[16/9] on mobile, aspect-[21/9] on lg — prevents a near-invisible image on small screens */}
        <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden brightness-90 shadow-2xl rounded-[1px]">
          <div className="absolute inset-0 border border-on-surface/5 pointer-events-none z-10" />
          <motion.img
            style={{ y: imgY }}
            alt="An intimate table set with simple, hand-thrown clay platters on a rustic teak slab deep within the coffee estate"
            className="absolute -top-[10%] -bottom-[10%] left-0 right-0 w-full h-full object-cover select-none scale-105"
            src={menuImg}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/40 to-transparent pointer-events-none" />
        </div>

        {/* Minimal Narrative list - highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 pt-4 sm:pt-8 items-start">
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-headline text-2xl sm:text-3xl text-on-surface font-medium">
              What's On The Table
            </h3>
            <p className="font-sans font-light text-sm sm:text-base text-on-surface/50 leading-relaxed">
              Home-style Karnataka cooking prepared fresh on the property. Breakfast, evening high tea, and a full dinner — no lunch. Simple, seasonal, and made with local produce.
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
                className="py-8 sm:py-10 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 group"
              >
                <div className="sm:col-span-4">
                  <h4 className="font-headline text-xl text-on-surface group-hover:text-[#e9c349] transition-colors duration-300">
                    {item.title}
                  </h4>
                  {item.subtitle && (
                    <p className="font-sans text-[10px] text-on-surface/35 tracking-wide mt-1 uppercase">
                      {item.subtitle}
                    </p>
                  )}
                </div>
                <div className="sm:col-span-8 space-y-2">
                  <ul className="space-y-1.5">
                    {item.items.map((line, i) => (
                      <li key={i} className="flex items-start gap-2 font-sans font-light text-sm text-on-surface/70 leading-relaxed">
                        <span className="text-[#e9c349]/50 mt-1.5 flex-shrink-0" style={{ fontSize: 5, lineHeight: 1 }}>●</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                  {item.note && (
                    <p className="font-sans text-[11px] text-on-surface/30 italic mt-3">
                      *{item.note}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
