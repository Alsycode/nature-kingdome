"use client";

import { useEffect, useState } from "react";

const ICONS = [
  {
    label: "Into the mountains",
    svg: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#e9c349" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="2,42 16,18 24,30 32,14 46,42" />
        <line x1="2" y1="42" x2="46" y2="42" />
        <polyline points="18,42 24,30 30,42" opacity="0.4" />
      </svg>
    ),
  },
  {
    label: "Through the estates",
    svg: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#e9c349" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="24" y1="44" x2="24" y2="14" />
        <polyline points="24,14 14,22 24,20 34,22 24,14" />
        <polyline points="24,22 16,28 24,26 32,28 24,22" />
        <polyline points="24,30 18,35 24,33 30,35 24,30" />
      </svg>
    ),
  },
  {
    label: "Almost there",
    svg: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#e9c349" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="20" width="36" height="14" rx="3" />
        <path d="M10 20 L14 12 H34 L38 20" />
        <circle cx="14" cy="35" r="4" />
        <circle cx="34" cy="35" r="4" />
        <line x1="18" y1="34" x2="30" y2="34" />
        <rect x="18" y="15" width="12" height="7" rx="1" opacity="0.5" />
      </svg>
    ),
  },
];

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [iconVisible, setIconVisible] = useState(true);

  useEffect(() => {
    const hide = () => {
      setFading(true);
      setTimeout(() => setVisible(false), 700);
    };

    // DOMContentLoaded = HTML parsed, page interactive — does NOT wait for
    // videos/images to finish downloading (unlike window.load which blocked
    // the loader for up to 8s waiting for Cloudinary videos)
    if (document.readyState !== "loading") {
      // Already past DOMContentLoaded
      setTimeout(hide, 300);
      return;
    }

    document.addEventListener("DOMContentLoaded", hide);
    const fallback = setTimeout(hide, 3000); // hard cap at 3s

    return () => {
      document.removeEventListener("DOMContentLoaded", hide);
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    const cycle = setInterval(() => {
      setIconVisible(false);
      setTimeout(() => {
        setActiveIndex((i) => (i + 1) % ICONS.length);
        setIconVisible(true);
      }, 400);
    }, 1800);
    return () => clearInterval(cycle);
  }, []);

  if (!visible) return null;

  const current = ICONS[activeIndex];

  return (
    <div className={`nk-loader-overlay${fading ? " nk-loader-fade" : ""}`}>

      {/* Icon */}
      {/* <div className={`nk-loader-icon${iconVisible ? " nk-icon-in" : " nk-icon-out"}`}>
        {current.svg}
      </div> */}

      {/* Triangle spinner */}
      <div className="nk-triangle" />

      {/* Text */}
      <p className={`nk-loader-label${iconVisible ? " nk-icon-in" : " nk-icon-out"}`}>
        {current.label}
      </p>

      <style>{`
        .nk-loader-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          background: #0a0a0a;
          opacity: 1;
          transition: opacity 0.7s ease;
        }
        .nk-loader-fade {
          opacity: 0;
          pointer-events: none;
        }

        /* Icon */
        .nk-loader-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .nk-icon-in {
          opacity: 1;
          transform: translateY(0px);
        }
        .nk-icon-out {
          opacity: 0;
          transform: translateY(6px);
        }

        /* Triangle */
        .nk-triangle {
          --b: 25%;
          height: 64px;
          aspect-ratio: 1/cos(30deg);
          position: relative;
          clip-path: polygon(50% 0,100% 100%,0 100%,50% 0,50% var(--b),calc(var(--b)*cos(30deg)) calc(100% - var(--b)/2),calc(100% - var(--b)*cos(30deg)) calc(100% - var(--b)/2),50% var(--b));
          filter: blur(10px);
        }
        .nk-triangle::before {
          content: "";
          position: absolute;
          inset: -8% 0;
          background: conic-gradient(#0000 35%, #e9c349, #0000 65%);
          animation: nk-spin 2s linear infinite;
        }
        @keyframes nk-spin {
          to { rotate: 1turn; }
        }

        /* Label */
        .nk-loader-label {
          font-family: 'Hanken Grotesk', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #8A9BAA;
          margin: 0;
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
      `}</style>
    </div>
  );
}
