import Image from "next/image";

export default function BrandStory() {
  return (
    <section
      id="story"
      className="relative w-full bg-[#050505] overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* ── NATURE watermark ── */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-headline font-bold text-[#F4E7D6] block leading-none"
          style={{
            fontSize: "22vw",
            opacity: 0.042,
            letterSpacing: "-0.02em",
            paddingLeft: "2vw",
            lineHeight: 0.84,
          }}
        >
          NATURE
        </span>
      </div>

      {/* ── TOP SPLIT: content (42%) + image (58%) ── */}
      {/* Removed hardcoded inline flex styles — use responsive Tailwind classes instead */}
      <div className="relative flex flex-col lg:flex-row" style={{ minHeight: "68vh" }}>

        {/* Left content column — full width on mobile, 42% on desktop */}
        <div className="relative z-10 flex flex-col justify-center px-8 sm:px-12 lg:px-24 pt-24 pb-12 lg:py-32 w-full lg:w-[42%]">
          {/* ETHOS label + rule */}
          <div className="mb-7 space-y-3">
            <span
              className="font-sans font-medium text-[#C8A97E] block"
              style={{ fontSize: 9, letterSpacing: "0.45em" }}
            >
              ETHOS
            </span>
            <div style={{ width: 32, height: 1, background: "rgba(200,169,126,0.55)" }} />
          </div>

          {/* Headline */}
          <h2
            className="font-headline text-[#F4E7D6] leading-[0.95] mb-10"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 7rem)", letterSpacing: "-0.01em" }}
          >
            Not A Stay.<br />A Return To Nature.
          </h2>

          {/* Thin gold rule below headline */}
          <div
            className="mb-10"
            style={{ width: 48, height: 1, background: "rgba(200,169,126,0.45)" }}
          />

          {/* Primary copy */}
          <p
            className="font-sans font-light text-[#F4E7D6]/85 leading-relaxed mb-7"
            style={{ fontSize: 15, maxWidth: 480 }}
          >
            We did not build a resort; we curated a clearing in the forest.
            Architecture that defers to ancient trees, lighting that respects
            the night sky, and spaces designed entirely for deep personal reflection.
          </p>

          {/* Secondary copy */}
          <p
            className="font-sans font-light text-white/50 leading-relaxed"
            style={{ fontSize: 13, maxWidth: 460 }}
          >
            Explore silent walking trails, breathe clean alpine mountain air, and
            find your natural center amidst absolute elegance and natural design.
          </p>
        </div>

        {/* Right image column — full height on mobile, 58% on desktop */}
        <div className="relative overflow-hidden w-full lg:w-[58%] min-h-[60vw] sm:min-h-[50vw] lg:min-h-0">
          <Image
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=85&w=1400"
            alt="Dark cinematic forest path lined with lanterns"
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover select-none transition-transform duration-[1200ms] ease-out hover:scale-[1.02]"
            draggable={false}
          />
          {/* Subtle left-edge blend into content area */}
          <div
            className="absolute inset-y-0 left-0 w-32 pointer-events-none"
            style={{ background: "linear-gradient(to right, #050505, transparent)" }}
          />
          {/* Top blend for mobile stacking */}
          <div
            className="absolute inset-x-0 top-0 h-20 pointer-events-none lg:hidden"
            style={{ background: "linear-gradient(to bottom, #050505, transparent)" }}
          />
          {/* Cinematic grade */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "rgba(20,10,2,0.28)", mixBlendMode: "multiply" }}
          />
        </div>
      </div>

      {/* ── Full-width divider ── */}
      <div style={{ height: 1, background: "rgba(200,169,126,0.16)" }} />

      {/* ── PHILOSOPHY ROW ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 relative">
        {/* Column 01 — SILENCE */}
        <div
          className="group flex flex-col items-center text-center sm:items-start sm:text-left px-8 sm:px-10 lg:px-24 py-12 lg:py-16 transition-colors duration-300 border-b sm:border-b-0 sm:border-r border-[rgba(200,169,126,0.13)]"
        >
          <div className="flex items-start gap-5 mb-6">
            <span
              className="font-sans text-[#C8A97E] font-light flex-shrink-0"
              style={{ fontSize: 13, letterSpacing: "0.1em" }}
            >
              01
            </span>
            <svg
              width="36" height="44" viewBox="0 0 36 44" fill="none"
              className="text-[#C8A97E]/60 group-hover:text-[#C8A97E] transition-colors duration-300 flex-shrink-0"
            >
              <path
                d="M18 2C18 2 2 14 2 26C2 34.3 9.2 41 18 41C26.8 41 34 34.3 34 26C34 14 18 2 18 2Z"
                stroke="currentColor" strokeWidth="0.85" fill="none"
              />
              <line x1="18" y1="2" x2="18" y2="41" stroke="currentColor" strokeWidth="0.85" />
              <path d="M18 26C12 20 6 22 4 28" stroke="currentColor" strokeWidth="0.85" />
              <path d="M18 18C13 13 8 15 6 20" stroke="currentColor" strokeWidth="0.85" />
            </svg>
          </div>
          <span
            className="font-sans font-medium text-[#F4E7D6]/75 block mb-3"
            style={{ fontSize: 11, letterSpacing: "0.35em" }}
          >
            SILENCE
          </span>
          <div
            className="mb-5"
            style={{ width: 20, height: 1, background: "rgba(200,169,126,0.50)" }}
          />
          <p
            className="font-sans font-light text-white/50 leading-relaxed"
            style={{ fontSize: 13 }}
          >
            Where the forest speaks<br />
            in whispers and time<br />
            slows to nature's rhythm.
          </p>
        </div>

        {/* Column 02 — PRESENCE */}
        <div
          className="group flex flex-col items-center text-center sm:items-start sm:text-left px-8 sm:px-10 lg:px-20 py-12 lg:py-16 transition-colors duration-300 border-b sm:border-b-0 sm:border-r border-[rgba(200,169,126,0.13)]"
        >
          <div className="flex items-start gap-5 mb-6">
            <span
              className="font-sans text-[#C8A97E] font-light flex-shrink-0"
              style={{ fontSize: 13, letterSpacing: "0.1em" }}
            >
              02
            </span>
            <svg
              width="44" height="44" viewBox="0 0 44 44" fill="none"
              className="text-[#C8A97E]/60 group-hover:text-[#C8A97E] transition-colors duration-300 flex-shrink-0"
            >
              <circle cx="22" cy="22" r="19" stroke="currentColor" strokeWidth="0.85" />
              <path
                d="M7 31L15 20L21 26L27 18L37 31"
                stroke="currentColor" strokeWidth="0.85" fill="none"
              />
              <path
                d="M30 14 A3.5 3.5 0 1 1 37 14"
                stroke="currentColor" strokeWidth="0.85" fill="none"
              />
            </svg>
          </div>
          <span
            className="font-sans font-medium text-[#F4E7D6]/75 block mb-3"
            style={{ fontSize: 11, letterSpacing: "0.35em" }}
          >
            PRESENCE
          </span>
          <div
            className="mb-5"
            style={{ width: 20, height: 1, background: "rgba(200,169,126,0.50)" }}
          />
          <p
            className="font-sans font-light text-white/50 leading-relaxed"
            style={{ fontSize: 13 }}
          >
            Be fully here.<br />
            With yourself,<br />
            with nature,<br />
            with what truly matters.
          </p>
        </div>

        {/* Column 03 — WILDERNESS */}
        <div
          className="group flex flex-col items-center text-center sm:items-start sm:text-left px-8 sm:px-10 lg:px-20 py-12 lg:py-16 transition-colors duration-300"
        >
          <div className="flex items-start gap-5 mb-6">
            <span
              className="font-sans text-[#C8A97E] font-light flex-shrink-0"
              style={{ fontSize: 13, letterSpacing: "0.1em" }}
            >
              03
            </span>
            <svg
              width="38" height="48" viewBox="0 0 38 48" fill="none"
              className="text-[#C8A97E]/60 group-hover:text-[#C8A97E] transition-colors duration-300 flex-shrink-0"
            >
              <path
                d="M19 2L32 18H25L36 34H22V46H16V34H2L13 18H6L19 2Z"
                stroke="currentColor" strokeWidth="0.85" fill="none"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            className="font-sans font-medium text-[#F4E7D6]/75 block mb-3"
            style={{ fontSize: 11, letterSpacing: "0.35em" }}
          >
            WILDERNESS
          </span>
          <div
            className="mb-5"
            style={{ width: 20, height: 1, background: "rgba(200,169,126,0.50)" }}
          />
          <p
            className="font-sans font-light text-white/50 leading-relaxed"
            style={{ fontSize: 13 }}
          >
            Raw, untouched, alive.<br />
            A landscape that<br />
            restores and realigns.
          </p>
        </div>
      </div>

      {/* Bottom divider */}
      <div style={{ height: 1, background: "rgba(200,169,126,0.10)" }} />
    </section>
  );
}
