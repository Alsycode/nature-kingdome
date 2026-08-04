import type { ReactNode } from "react";
import LuxuryFooter from "@/components/LuxuryFooter";

export default function StayInfoShell({ children }: { children: ReactNode }) {
  return (
    <div className="bg-surface text-on-surface font-sans antialiased">
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 sm:px-12 py-6 bg-surface border-b border-on-surface/5">
        <a
          href="/stay-info"
          className="text-[10px] tracking-[0.35em] text-[#e9c349] uppercase font-sans hover:opacity-70 transition-opacity duration-300"
        >
          ← All Stay Info
        </a>
        <a href="/book" className="btn-editorial px-5 py-2.5 text-[10px] tracking-[0.25em] text-[#e9c349]">
          Book Now
        </a>
      </header>

      <main className="pt-32">{children}</main>

      <LuxuryFooter />
    </div>
  );
}
