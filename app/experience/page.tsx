"use client";

import Image from "next/image";
import { motion } from "motion/react";
import ForestImmersion from "@/components/ForestImmersion";
import ADayInTheForest from "@/components/AdayInTheForest";
import Dining from "@/components/Dining";
import LuxuryFooter from "@/components/LuxuryFooter";

const ease = [0.25, 1, 0.5, 1] as [number, number, number, number];

export default function ExperiencePage() {
  return (
    <div className="bg-surface text-on-surface font-sans antialiased">

      {/* ── Nav ── */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 sm:px-12 py-6 bg-surface border-b border-on-surface/5">
        <a
          href="/"
          className="text-[10px] tracking-[0.35em] text-[#e9c349] uppercase font-sans hover:opacity-70 transition-opacity duration-300"
        >
          ← Nature Kingdom
        </a>
        <a
          href="/book"
          className="btn-editorial px-5 py-2.5 text-[10px] tracking-[0.25em] text-[#e9c349]"
        >
          Book Your Stay
        </a>
      </header>

      <main>

        {/* ─────────────────────────────────────────
            Hero / H1
        ───────────────────────────────────────── */}
        <section className="relative pt-40 pb-24 sm:pt-52 sm:pb-32 px-6 sm:px-12 lg:px-20 bg-[#050505] overflow-hidden">

          {/* Banner Image */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <Image
              src="/assets/experiencehero.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-[#050505]/80" />
          </div>

          {/* Watermark */}
          <div className="absolute inset-x-0 top-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
            <span
              className="font-headline font-bold text-[#F4E7D6] block leading-none"
              style={{ fontSize: "18vw", opacity: 0.038, letterSpacing: "-0.02em", paddingLeft: "2vw", lineHeight: 0.84 }}
            >
              RHYTHM
            </span>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="max-w-3xl">
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease }}
                className="text-[10px] tracking-[0.4em] text-[#e9c349] uppercase font-sans font-semibold block mb-6"
              >
                The Experience · Nature Kingdom
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.1, ease }}
                className="font-headline text-4xl sm:text-5xl lg:text-[3.6rem] text-[#F4E7D6] leading-[1.05] tracking-tight mb-8"
              >
                A Day Measured in Passing Clouds,<br />Changing Shadows, and Wild Choruses.
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease }}
                className="origin-left mb-8"
                style={{ width: 48, height: 1, background: "rgba(200,169,126,0.55)" }}
              />

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.4, ease }}
                className="font-sans font-light text-base sm:text-lg text-[#F4E7D6]/70 leading-[1.85] max-w-2xl"
              >
                From the first mountain sounds at dawn to the last ember of the bonfire - this is what
                a stay at Nature Kingdom feels like, hour by hour, meal by meal.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ── The immersive sections, in their original glory ── */}
        <ForestImmersion />
        <ADayInTheForest />
        <Dining />

        {/* ─────────────────────────────────────────
            Final CTA
        ───────────────────────────────────────── */}
        <section className="py-24 sm:py-32 px-6 sm:px-12 lg:px-20 bg-[#050505] border-t border-on-surface/5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 1.2, ease }}
            className="max-w-2xl mx-auto text-center space-y-7"
          >
            <span className="text-[10px] tracking-[0.4em] text-[#e9c349] uppercase font-sans font-semibold block">
              Ready to Experience It?
            </span>
            <h2 className="font-headline text-3xl sm:text-5xl text-[#F4E7D6] leading-tight">
              Book Your Stay and<br />Let the Mountains Set the Pace.
            </h2>
            <p className="font-sans font-light text-sm sm:text-base text-white/45 leading-relaxed max-w-lg mx-auto">
              Submit your dates on the booking form. We confirm via WhatsApp within 2 hours.
              No payment until your booking is confirmed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a href="/book" className="btn-editorial inline-block px-12 py-4 text-xs tracking-[0.25em] text-[#e9c349]">
                Check Availability
              </a>
              <a
                href="/explore"
                className="inline-block px-12 py-4 text-xs tracking-[0.25em] uppercase font-sans text-on-surface/40 hover:text-[#e9c349] transition-colors duration-300 border border-on-surface/10 hover:border-[#e9c349]/30"
              >
                Explore Chikmagalur →
              </a>
            </div>
          </motion.div>
        </section>

      </main>

      <LuxuryFooter />
    </div>
  );
}
