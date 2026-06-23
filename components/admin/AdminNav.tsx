"use client";
import { useState } from "react";
import Link from "next/link";

type NavItem = { href: string; label: string; active?: boolean };

interface AdminNavProps {
  items: NavItem[];
  rightSlot?: React.ReactNode;
}

export default function AdminNav({ items, rightSlot }: AdminNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/5 bg-[#0e1a13] sticky top-0 z-40">
      <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-6 min-w-0">
          <h1 className="text-sm sm:text-base font-serif text-white whitespace-nowrap flex-shrink-0">
            Nature Kingdom
          </h1>
          <nav className="hidden md:flex items-center gap-4 text-sm">
            {items.map((item) =>
              item.active ? (
                <span key={item.href} className="text-[#e9c349]">
                  {item.label}
                </span>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white/50 hover:text-white transition"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="hidden md:flex items-center gap-2">{rightSlot}</div>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-lg hover:bg-white/5 transition"
          >
            <span
              className={`w-[18px] h-[1.5px] bg-white/70 transition-all duration-200 origin-center block ${
                open ? "rotate-45 translate-y-[6.5px]" : ""
              }`}
            />
            <span
              className={`w-[18px] h-[1.5px] bg-white/70 transition-all duration-200 block ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-[18px] h-[1.5px] bg-white/70 transition-all duration-200 origin-center block ${
                open ? "-rotate-45 -translate-y-[6.5px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 px-4 py-3 flex flex-col gap-1">
          {items.map((item) =>
            item.active ? (
              <span
                key={item.href}
                className="px-3 py-2 text-sm text-[#e9c349] font-medium rounded-lg bg-[#e9c349]/5"
              >
                {item.label}
              </span>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition"
              >
                {item.label}
              </Link>
            )
          )}
          {rightSlot && (
            <div className="mt-2 pt-3 border-t border-white/5 flex flex-col gap-2">
              {rightSlot}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
