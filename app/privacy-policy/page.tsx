"use client";

import { motion } from "motion/react";
import type { Metadata } from "next";
import LuxuryFooter from "@/components/LuxuryFooter";

const ease = [0.25, 1, 0.5, 1] as [number, number, number, number];

const ShieldIcon = () => (
  <svg width="38" height="44" viewBox="0 0 38 44" fill="none">
    <path
      d="M19 2L4 8V20C4 30 19 42 19 42C19 42 34 30 34 20V8L19 2Z"
      stroke="currentColor"
      strokeWidth="0.85"
      fill="none"
    />
    <path
      d="M13 21L17 25L25 17"
      stroke="currentColor"
      strokeWidth="0.85"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LockIcon = () => (
  <svg width="32" height="38" viewBox="0 0 32 38" fill="none">
    <rect x="4" y="18" width="24" height="18" rx="2" stroke="currentColor" strokeWidth="0.85" fill="none" />
    <path d="M9 18V12C9 7.6 23 7.6 23 12V18" stroke="currentColor" strokeWidth="0.85" fill="none" />
    <circle cx="16" cy="27" r="2.5" stroke="currentColor" strokeWidth="0.85" fill="none" />
    <line x1="16" y1="29.5" x2="16" y2="33" stroke="currentColor" strokeWidth="0.85" />
  </svg>
);

const EyeIcon = () => (
  <svg width="42" height="28" viewBox="0 0 42 28" fill="none">
    <path d="M2 14C2 14 9 4 21 4C33 4 40 14 40 14C40 14 33 24 21 24C9 24 2 14 2 14Z" stroke="currentColor" strokeWidth="0.85" fill="none" />
    <circle cx="21" cy="14" r="5.5" stroke="currentColor" strokeWidth="0.85" fill="none" />
    <path d="M21 9V14L24 17" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round" />
  </svg>
);

const HandIcon = () => (
  <svg width="34" height="40" viewBox="0 0 34 40" fill="none">
    <path d="M10 22V8C10 6.3 11.3 5 13 5C14.7 5 16 6.3 16 8V18" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round" fill="none" />
    <path d="M16 16V6C16 4.3 17.3 3 19 3C20.7 3 22 4.3 22 6V16" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round" fill="none" />
    <path d="M22 14V8C22 6.3 23.3 5 25 5C26.7 5 28 6.3 28 8V22" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round" fill="none" />
    <path d="M10 22C10 22 6 20 4 24C3 26 4 30 8 32C11 34 16 36 20 36C26 36 32 32 32 26V22C32 20.3 30.7 19 29 19C27.3 19 26 20.3 26 22" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round" fill="none" />
  </svg>
);

const sections = [
  {
    num: "01",
    label: "Information We Collect",
    title: "What We Know About You.",
    content: [
      {
        heading: "When you make a booking",
        body: "We collect your name, phone number, email address, travel dates, and the number of guests. This is the minimum we need to confirm your stay and prepare for your arrival.",
      },
      {
        heading: "When you contact us",
        body: "Messages sent via WhatsApp, the booking form, or email are received and stored only as long as necessary to respond to your inquiry or manage your booking.",
      },
      {
        heading: "Automatically, when you visit our website",
        body: "We use Google Analytics to understand how visitors find and move through our website. This collects anonymised data such as pages visited, time spent, and device type. It does not identify you personally.",
      },
    ],
  },
  {
    num: "02",
    label: "How We Use Your Information",
    title: "Only What It Takes.",
    content: [
      {
        heading: "To confirm and manage your booking",
        body: "Your contact details are used to send your booking confirmation, share directions and arrival information, and coordinate your stay. We communicate primarily via WhatsApp.",
      },
      {
        heading: "To prepare for your visit",
        body: "Knowing your group size, dietary preferences, and any special requests lets us prepare meals, set up the bonfire at the right time, and make your arrival smooth.",
      },
      {
        heading: "To improve our website",
        body: "Anonymised analytics data helps us understand which pages are useful and what information guests look for before arriving. We use this to make the site clearer, not to target you with advertising.",
      },
    ],
  },
  {
    num: "03",
    label: "Data Storage & Security",
    title: "How We Protect What You Share.",
    content: [
      {
        heading: "Where your data is stored",
        body: "Booking information is stored securely using Supabase, a cloud database service with industry-standard encryption. WhatsApp messages are stored within the WhatsApp platform under Meta's data policies.",
      },
      {
        heading: "How long we keep it",
        body: "We retain booking records for a reasonable period to handle any post-stay queries, then delete or anonymise them. We do not hold data beyond what is necessary for the purpose it was collected.",
      },
      {
        heading: "Who can access it",
        body: "Your personal information is accessible only to the people who run Nature Kingdom. We do not sell, rent, or share your data with third parties for commercial purposes.",
      },
    ],
  },
  {
    num: "04",
    label: "Third-Party Services",
    title: "Tools We Use.",
    content: [
      {
        heading: "Google Analytics",
        body: "We use Google Analytics 4 to measure website traffic. Google processes this data on our behalf. You can opt out using Google's browser opt-out extension, or by adjusting your browser's privacy settings.",
      },
      {
        heading: "WhatsApp (Meta)",
        body: "We use WhatsApp to confirm bookings and communicate with guests. Messages sent via WhatsApp are subject to Meta's own privacy policy.",
      },
      {
        heading: "No advertising networks",
        body: "We do not run retargeting ads or share your data with advertising networks. If you see a Nature Kingdom ad anywhere, it is not because we tracked you.",
      },
    ],
  },
  {
    num: "05",
    label: "Your Rights",
    title: "What You Can Ask Of Us.",
    content: [
      {
        heading: "Access and correction",
        body: "You can ask us what personal information we hold about you and request that any inaccurate details be corrected. Message us on WhatsApp or email us directly.",
      },
      {
        heading: "Deletion",
        body: "You can request that we delete your personal information. We will do so unless we have a legal obligation to retain it, such as accounting records.",
      },
      {
        heading: "Opting out of communications",
        body: "If you no longer wish to receive messages from us, simply tell us and we will stop. We do not send newsletters or marketing emails without your consent.",
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#050505] text-[#F4E7D6] font-sans antialiased">

      {/* ── Navigation ── */}
      <header
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 sm:px-12 py-5"
        style={{ borderBottom: "1px solid rgba(200,169,126,0.10)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backdropFilter: "blur(12px)", background: "rgba(5,5,5,0.72)" }}
        />
        <a
          href="/"
          className="relative text-[10px] tracking-[0.35em] text-[#C8A97E] uppercase font-sans hover:text-[#e9c349] transition-colors duration-300"
        >
          ← Nature Kingdom
        </a>
        <a
          href="/book"
          className="relative btn-editorial px-5 py-2.5 text-[10px] tracking-[0.25em] text-[#e9c349]"
        >
          Book Your Stay
        </a>
      </header>

      <main>

        {/* ═══════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════ */}
        <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-[#050505] pt-20">

          {/* Watermark */}
          <div
            className="absolute inset-x-0 top-0 pointer-events-none select-none overflow-hidden z-[1]"
            aria-hidden="true"
          >
            <span
              className="font-headline font-bold text-[#F4E7D6] block leading-none"
              style={{
                fontSize: "18vw",
                opacity: 0.035,
                letterSpacing: "-0.02em",
                paddingLeft: "1vw",
                lineHeight: 0.82,
                paddingTop: "2vw",
              }}
            >
              PRIVACY
            </span>
          </div>

          {/* Hero content */}
          <div className="relative z-10 w-full px-8 sm:px-12 lg:px-20 pb-20 pt-32 lg:pt-40">
            <div className="max-w-7xl mx-auto">
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease }}
                className="block text-[10px] tracking-[0.42em] text-[#e9c349] uppercase font-sans font-semibold mb-7"
              >
                Legal · Privacy Policy
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.1, ease }}
                className="font-headline text-[#F4E7D6] leading-[1.06] tracking-tight mb-8"
                style={{ fontSize: "clamp(32px, 4.5vw, 64px)" }}
              >
                We Ask for What We Need.<br />
                We Use It for Nothing Else.
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease }}
                className="origin-left mb-8"
                style={{ width: 44, height: 1, background: "rgba(200,169,126,0.5)" }}
              />

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.4, ease }}
                className="font-sans font-light text-[#F4E7D6]/55 leading-relaxed max-w-xl"
                style={{ fontSize: 14 }}
              >
                Nature Kingdom is a small, privately run homestay. Your trust matters more to
                us than data. This page explains plainly what we collect, why we collect it,
                and how you can ask us to stop.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7, ease }}
                className="font-sans font-light mt-5"
                style={{ fontSize: 11, color: "rgba(200,169,126,0.4)", letterSpacing: "0.06em" }}
              >
                Last updated: July 2026
              </motion.p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            PRINCIPLE CARDS
        ═══════════════════════════════════════════ */}
        <section
          className="py-20 px-8 sm:px-12 lg:px-20"
          style={{ borderTop: "1px solid rgba(200,169,126,0.1)" }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1, ease }}
              className="mb-12"
            >
              <span
                className="block font-sans font-medium text-[#C8A97E] uppercase mb-4"
                style={{ fontSize: 9.5, letterSpacing: "0.38em" }}
              >
                Our Principles
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl text-[#F4E7D6] leading-tight">
                Three Things We Commit To.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(200,169,126,0.1)]">
              {[
                {
                  Icon: ShieldIcon,
                  title: "No Selling",
                  body: "Your data is never sold, rented, or shared with third parties for commercial gain. Full stop.",
                },
                {
                  Icon: LockIcon,
                  title: "No Surprises",
                  body: "We only use your information for what we said we would: to confirm and manage your stay.",
                },
                {
                  Icon: EyeIcon,
                  title: "Transparency",
                  body: "If you want to know what we hold about you, ask. We will tell you straightforwardly.",
                },
                {
                  Icon: HandIcon,
                  title: "Your Control",
                  body: "Ask us to correct or delete your data at any time. We will act on it without friction.",
                },
              ].map(({ Icon, title, body }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 1, delay: i * 0.1, ease }}
                  className="bg-[#060606] px-8 py-10 lg:px-10 lg:py-12 flex flex-col gap-5"
                >
                  <div className="text-[#C8A97E]/55">
                    <Icon />
                  </div>
                  <div>
                    <h3 className="font-headline text-base text-[#F4E7D6] mb-3">{title}</h3>
                    <p className="font-sans font-light text-xs text-[#F4E7D6]/40 leading-relaxed">{body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            POLICY SECTIONS
        ═══════════════════════════════════════════ */}
        {sections.map((section, sIdx) => (
          <section
            key={section.num}
            className="py-20 sm:py-28 px-8 sm:px-12 lg:px-20"
            style={{
              borderTop: "1px solid rgba(200,169,126,0.1)",
              background: sIdx % 2 === 1 ? "#060606" : "#050505",
            }}
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20 items-start">

              {/* Left: Section heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 1.2, ease }}
              >
                <span
                  className="block font-sans font-medium text-[#C8A97E] uppercase mb-5"
                  style={{ fontSize: 9.5, letterSpacing: "0.38em" }}
                >
                  {section.num} — {section.label}
                </span>
                <h2 className="font-headline text-2xl sm:text-3xl text-[#F4E7D6] leading-tight">
                  {section.title}
                </h2>
              </motion.div>

              {/* Right: Content blocks */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 1.2, delay: 0.15, ease }}
                className="space-y-0"
                style={{ borderTop: "1px solid rgba(200,169,126,0.12)" }}
              >
                {section.content.map((block, bIdx) => (
                  <div
                    key={bIdx}
                    className="py-7"
                    style={{
                      borderBottom: "1px solid rgba(200,169,126,0.08)",
                    }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 sm:gap-8">
                      <p
                        className="font-sans font-medium text-[#C8A97E]/75 leading-snug"
                        style={{ fontSize: 12, letterSpacing: "0.04em" }}
                      >
                        {block.heading}
                      </p>
                      <p
                        className="font-sans font-light text-[#F4E7D6]/50 leading-relaxed"
                        style={{ fontSize: 13 }}
                      >
                        {block.body}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>

            </div>
          </section>
        ))}

        {/* ═══════════════════════════════════════════
            COOKIES NOTE
        ═══════════════════════════════════════════ */}
        <section
          className="py-20 sm:py-24 px-8 sm:px-12 lg:px-20 bg-[#050505]"
          style={{ borderTop: "1px solid rgba(200,169,126,0.1)" }}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20 items-start">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1.2, ease }}
            >
              <span
                className="block font-sans font-medium text-[#C8A97E] uppercase mb-5"
                style={{ fontSize: 9.5, letterSpacing: "0.38em" }}
              >
                06 — Cookies
              </span>
              <h2 className="font-headline text-2xl sm:text-3xl text-[#F4E7D6] leading-tight">
                A Brief Word on Cookies.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1.2, delay: 0.15, ease }}
              className="space-y-4"
            >
              <p
                className="font-sans font-light text-[#F4E7D6]/50 leading-relaxed"
                style={{ fontSize: 13 }}
              >
                Our website uses cookies only for Google Analytics, which helps us understand
                how many people visit and which pages are most useful. These are analytics
                cookies, not advertising or tracking cookies.
              </p>
              <p
                className="font-sans font-light text-[#F4E7D6]/50 leading-relaxed"
                style={{ fontSize: 13 }}
              >
                You can block or delete cookies through your browser settings at any time.
                Doing so will not affect your ability to use the website or make a booking.
                We do not require cookie consent to function.
              </p>
            </motion.div>

          </div>
        </section>

        {/* ═══════════════════════════════════════════
            CHANGES TO THIS POLICY
        ═══════════════════════════════════════════ */}
        <section
          className="py-20 sm:py-24 px-8 sm:px-12 lg:px-20 bg-[#060606]"
          style={{ borderTop: "1px solid rgba(200,169,126,0.1)" }}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20 items-start">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1.2, ease }}
            >
              <span
                className="block font-sans font-medium text-[#C8A97E] uppercase mb-5"
                style={{ fontSize: 9.5, letterSpacing: "0.38em" }}
              >
                07 — Updates
              </span>
              <h2 className="font-headline text-2xl sm:text-3xl text-[#F4E7D6] leading-tight">
                If Anything Changes.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1.2, delay: 0.15, ease }}
              className="space-y-4"
            >
              <p
                className="font-sans font-light text-[#F4E7D6]/50 leading-relaxed"
                style={{ fontSize: 13 }}
              >
                We may update this privacy policy when our practices change or when required
                by law. The date at the top of this page reflects when it was last revised.
                We will not make changes that reduce your rights without giving reasonable notice.
              </p>
              <p
                className="font-sans font-light text-[#F4E7D6]/50 leading-relaxed"
                style={{ fontSize: 13 }}
              >
                If you have stayed with us before and are concerned about how a change affects
                the information you shared, message us on WhatsApp and we will explain clearly.
              </p>
            </motion.div>

          </div>
        </section>

        {/* ═══════════════════════════════════════════
            CONTACT CTA
        ═══════════════════════════════════════════ */}
        <section
          className="py-24 sm:py-32 px-8 sm:px-12 lg:px-20 text-center bg-[#050505]"
          style={{ borderTop: "1px solid rgba(200,169,126,0.1)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 1.2, ease }}
            className="max-w-2xl mx-auto space-y-7"
          >
            <span
              className="block font-sans font-medium text-[#C8A97E] uppercase"
              style={{ fontSize: 9.5, letterSpacing: "0.42em" }}
            >
              Questions About Your Data
            </span>

            <h2 className="font-headline text-3xl sm:text-5xl text-[#F4E7D6] leading-tight">
              If Anything Here<br />Is Unclear, Ask.
            </h2>

            <p
              className="font-sans font-light text-[#F4E7D6]/45 leading-relaxed mx-auto"
              style={{ fontSize: 14, maxWidth: 480 }}
            >
              We are a small property. You can reach us directly on WhatsApp and get a
              straight answer. There is no privacy desk or automated response here — just
              the people who run Nature Kingdom.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="https://wa.me/919148678686"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial inline-flex items-center gap-3 px-10 py-4 text-[10px] tracking-[0.3em] text-[#e9c349]"
              >
                Message Us on WhatsApp
                <span aria-hidden="true">→</span>
              </a>
              <a
                href="/faq"
                className="inline-block px-10 py-4 text-xs tracking-[0.28em] uppercase font-sans text-[#F4E7D6]/35 hover:text-[#e9c349] transition-colors duration-300 border border-[rgba(200,169,126,0.15)] hover:border-[#e9c349]/30"
              >
                Read the FAQ
              </a>
            </div>
          </motion.div>
        </section>

      </main>

      <LuxuryFooter />
    </div>
  );
}
