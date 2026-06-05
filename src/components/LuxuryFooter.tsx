import { ArrowUpRight, ArrowRight, Instagram, Youtube, Facebook, MessageCircle } from "lucide-react";
import NightVilla from "../../assets/.aistudio/nightvilla.png";
const socials = [
  { label: "Instagram", Icon: Instagram,      href: "#" },
  { label: "YouTube",   Icon: Youtube,         href: "#" },
  { label: "Facebook",  Icon: Facebook,        href: "#" },
  { label: "WhatsApp",  Icon: MessageCircle,   href: "#" },
] as const;

const legalLinks = [
  { label: "Privacy Policy",     href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Contact Us",         href: "#" },
] as const;

export default function LuxuryFooter() {
  return (
    <footer className="w-full bg-[#050505] overflow-hidden">

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1 · HERO BANNER  (≈ 62% of total footer height)
      ───────────────────────────────────────────────────────────── */}
      <div className="relative flex flex-col justify-end" style={{ minHeight: "62vh" }}>

        {/* Background image */}
        <img
          src={NightVilla}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          draggable={false}
        />

        {/* Layered cinematic overlays */}
        <div className="absolute inset-0 bg-black/60" />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(38,18,4,0.42)", mixBlendMode: "multiply" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 60% 50%, transparent 25%, rgba(0,0,0,0.65) 100%)",
          }}
        />
        {/* Top fade — blends into section above */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#050505] to-transparent" />

        {/* ── BELONG watermark ── */}
        <div
          className="absolute inset-x-0 top-0 overflow-hidden pointer-events-none select-none"
          aria-hidden="true"
        >
          <span
            className="font-headline font-bold text-[#F4E7D6] block tracking-tight"
            style={{
              fontSize:   "21vw",
              lineHeight: 0.82,
              opacity:    0.038,
              letterSpacing: "-0.02em",
              paddingLeft: "2vw",
            }}
          >
            BELONG
          </span>
        </div>

        {/* ── Foreground content ── */}
        <div className="relative z-10 px-12 sm:px-16 lg:px-24 pb-14 lg:pb-20 space-y-8">

          {/* Headline */}
          <h2
            className="font-headline text-[#F4E7D6] leading-[0.92] tracking-[-0.01em]"
            style={{ fontSize: "clamp(52px, 6.5vw, 108px)" }}
          >
            UNTIL WE<br />MEET AGAIN
          </h2>

          {/* Location block */}
          <div className="space-y-2.5">
            {/* Decorative line + sanctuary name */}
            <div className="flex items-center gap-4">
              <div
                className="flex-shrink-0"
                style={{ width: 32, height: 1, background: "rgba(200,169,126,0.65)" }}
              />
              <span
                className="font-sans font-medium text-[#C8A97E]"
                style={{ fontSize: 9, letterSpacing: "0.4em" }}
              >
                NATURE KINGDOME
              </span>
            </div>
            {/* City line */}
            <p
              className="font-sans font-light text-white/45"
              style={{
                fontSize: 12,
                letterSpacing: "0.28em",
                paddingLeft: 48, /* aligns under text above */
              }}
            >
              Chikkamagaluru, Karnataka
            </p>
          </div>
        </div>

        {/* Bottom section divider */}
        <div
          className="relative z-10 w-full"
          style={{ height: 1, background: "rgba(200,169,126,0.18)" }}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2 · SOCIAL LINKS  (≈ 17% of total footer height)
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4">
        {socials.map(({ label, Icon, href }, i) => (
          <a
            key={label}
            href={href}
            className={[
              "group flex flex-col items-center justify-center gap-4 py-10 lg:py-12",
              "border-r last:border-r-0",
              "border-[rgba(200,169,126,0.13)]",
              "transition-colors duration-300",
              "hover:bg-[rgba(200,169,126,0.04)]",
              /* Mobile: 2-col grid → add bottom borders on first two */
              i < 2 ? "border-b sm:border-b-0 border-[rgba(200,169,126,0.13)]" : "",
            ].join(" ")}
          >
            {/* Platform name + arrow */}
            <div className="flex items-center gap-2">
              <span
                className="font-sans font-medium text-[#F4E7D6]/55 group-hover:text-[#C8A97E] transition-colors duration-300"
                style={{ fontSize: 10, letterSpacing: "0.3em" }}
              >
                {label.toUpperCase()}
              </span>
              <ArrowUpRight
                size={11}
                className="text-[#C8A97E]/40 group-hover:text-[#C8A97E] transition-colors duration-300"
              />
            </div>

            {/* Small decorative divider */}
            <div
              style={{
                width: 20,
                height: 1,
                background: "rgba(200,169,126,0.35)",
              }}
            />

            {/* Platform icon */}
            <Icon
              size={17}
              className="text-[#C8A97E]/45 group-hover:text-[#C8A97E] transition-colors duration-300"
            />
          </a>
        ))}
      </div>

      {/* Social / bottom-bar divider */}
      <div style={{ height: 1, background: "rgba(200,169,126,0.15)" }} />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3 · BOTTOM FOOTER  (≈ 21% of total footer height)
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-10 sm:gap-4 px-12 sm:px-16 lg:px-24 py-10 lg:py-12">

        {/* Left · Brand identity */}
        <div className="flex flex-col items-start space-y-3">
          {/* Logo mark */}
          <div
            className="flex items-center justify-center"
            style={{
              width: 34,
              height: 34,
              border: "1px solid rgba(200,169,126,0.30)",
            }}
          >
            <span className="font-headline text-[#C8A97E] font-semibold" style={{ fontSize: 11 }}>
              NK
            </span>
          </div>
          <div className="space-y-1">
            <p
              className="font-sans font-medium text-[#F4E7D6]/55"
              style={{ fontSize: 9, letterSpacing: "0.38em" }}
            >
              NATURE KINGDOME
            </p>
            <p
              className="font-sans font-light text-[#C8A97E]/38"
              style={{ fontSize: 8, letterSpacing: "0.3em" }}
            >
              CHIKKAMAGALURU
            </p>
          </div>
        </div>

        {/* Center · Book CTA */}
        <div className="flex justify-center sm:justify-center">
          <a
            href="#"
            className="group flex items-center justify-between w-full max-w-[300px] gap-6 px-8 py-4"
            style={{ border: "1px solid rgba(200,169,126,0.30)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "rgba(200,169,126,0.70)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "rgba(200,169,126,0.30)")
            }
          >
            <span
              className="font-sans font-medium text-[#C8A97E]"
              style={{ fontSize: 10, letterSpacing: "0.35em" }}
            >
              BOOK YOUR STAY
            </span>
            <ArrowRight
              size={14}
              className="text-[#C8A97E] flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>

        {/* Right · Legal links */}
        <div className="flex flex-col items-start sm:items-end space-y-3">
          {legalLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="font-sans font-light text-[#F4E7D6]/35 transition-colors duration-200 hover:text-[#C8A97E]"
              style={{ fontSize: 9, letterSpacing: "0.28em" }}
            >
              {label.toUpperCase()}
            </a>
          ))}
        </div>
      </div>

      {/* ── Copyright ── */}
      <div
        className="text-center py-5"
        style={{ borderTop: "1px solid rgba(200,169,126,0.10)" }}
      >
        <p
          className="font-sans font-light text-white/22"
          style={{ fontSize: 8, letterSpacing: "0.32em" }}
        >
          © 2026 THE SANCTUARY, CHIKKAMAGALURU. ALL RIGHTS RESERVED.
        </p>
      </div>

    </footer>
  );
}
