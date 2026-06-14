import { motion } from "motion/react";

export default function SidebarRail() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.5, delay: 0.2, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
      className="hidden lg:flex fixed left-0 top-0 h-screen w-20 border-r border-[#f5f5f0]/10 flex-col justify-between items-center py-20 z-40 pointer-events-none"
    >
      {/* Top Coordinate Info or Series marker */}
      <div className="text-[9px] tracking-[0.3em] uppercase text-on-surface/40">
        WESTERN GHATS
      </div>

      {/* Vertical Rotated Text */}
      <div className="[writing-mode:vertical-rl] rotate-180 text-[9px] tracking-[0.5em] uppercase text-on-surface/30 select-none">
        THE NATURE KINGDOM SANCTUARY
      </div>

      {/* Edition Indicator */}
      <div className="text-[12px] font-headline font-semibold italic text-[#e9c349]/80">
        Vol. I
      </div>
    </motion.aside>
  );
}
