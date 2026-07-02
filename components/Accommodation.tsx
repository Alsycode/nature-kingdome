"use client";
import { motion } from "motion/react";

export default function Accommodation() {
  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="stay"
      className="py-24 sm:py-32 lg:py-48 px-6 sm:px-12 lg:px-20 w-full bg-surface relative"
    >
      <div className="max-w-7xl mx-auto flex flex-col space-y-24 sm:space-y-32">
        {/* Section Heading Block */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={revealVariants}
          className="space-y-4 max-w-2xl"
        >
          <span className="text-xs sm:text-sm tracking-[0.3em] font-semibold text-[#e9c349] uppercase block font-sans">
            The Lodging
          </span>
          <h2 className="font-headline text-4xl sm:text-6xl lg:text-7xl leading-tight text-on-surface tracking-tight">
            Crafted For Quiet Living.
          </h2>
          <p className="font-sans font-light text-base sm:text-lg text-on-surface/60 max-w-lg leading-relaxed">
            Interiors born from local slate, warm teak, and absolute stillness. Every architectural detail defers to the landscape outside.
          </p>
        </motion.div>

        {/* First Asymmetric Row - Bedroom Sanctuary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden brightness-90">
              <div className="absolute inset-0 border border-on-surface/5 pointer-events-none z-10" />
              <motion.img
                initial={{ scale: 1.08, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                alt="Minimalist luxury master bed styled with clean fine linen overlooking primary bamboo thickets"
                className="w-full h-full object-cover select-none"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1SHNI7ct5Yx-u6MpbHwS6oyrEJ921q4Yn3Z41bBEtgFzPY-__Lg_Axd8x-eh003gHkw-ViyffOteJk8_n_ziwXc03RRkVHf0Q3B_CaP3K4ezodoZj0G-kr_2Z1plC0m0B7BoXboDtjB8LSLTM3EV5DRrsKXtK5GH8Ztq4jiR9aNexNnnHDoVbgmTf11k1cEGvX-GRrK3RqOfcMhclTt9nEPzzdiDesoiSebBETDWiD7BhZ4yKHKCpaTXyg7eEcOiPFSC4Mj52ZASf"
              />
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <span className="text-xs font-mono tracking-[0.25em] text-[#e9c349]/80 uppercase">
              Cabin Core — Suite 101
            </span>
            <h3 className="font-headline text-3xl sm:text-4xl text-on-surface">
              The Pavilion Suite
            </h3>
            <p className="font-sans font-light text-sm sm:text-base text-on-surface/75 leading-relaxed">
              Step onto wide solid floors of harvested timber, framed by soaring windows. The master suite positions the bed directly in front of the trees, ensuring a daily connection with the morning sunlit mist.
            </p>
          </div>
        </div>

        {/* Second Asymmetric Row - Bath & Restoration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center pt-8">
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center space-y-6 lg:text-right lg:items-end">
            <span className="text-xs font-mono tracking-[0.25em] text-[#e9c349]/80 uppercase">
              The Bathhouse Sanctuary — Elemental Rest
            </span>
            <h3 className="font-headline text-3xl sm:text-4xl text-on-surface">
                 Stone & Light Sanctuary
            </h3>
            <p className="font-sans font-light text-sm sm:text-base text-on-surface/75 leading-relaxed lg:max-w-md">
 A thoughtfully crafted bathing space where warm ambient lighting, natural textures, and quiet design create a ritual of restoration. Unwind in complete privacy and embrace moments of stillness surrounded by the timeless calm of the Western Ghats.
            </p>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden brightness-90">
              <div className="absolute inset-0 border border-on-surface/5 pointer-events-none z-10" />
              <motion.img
                initial={{ scale: 1.08, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                alt="Outdoor stone soaking bath open to the coffee estate surroundings"
                className="w-full h-full object-cover select-none"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxdrtD8r9pKg2sIi6aAwhzlDeDG0NXqzuFNnnaM19DoRp2s_OOXWcSWnluK0iXbjPJkq0L4yv2WZryVS5YmctpBdfpnFZFzwXc6I3ZKyll7tfrPd56-CEpi5hiDESV5N0MYxZ1z4wlFRU9_cSHbvsxqr851SWHUcLRh3fZGY2D1cMbqO6P1OEa-9kwJg3XAqSCcXrYXqk_HdbwcjIXjm5_l0srbCldba2G9w_i5DIrz6xk3SP5Wf4Gu1wFElp1lbE1MpTxWmWe_f7P"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
