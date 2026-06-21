"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const hide = () => {
      setFading(true);
      setTimeout(() => setVisible(false), 600);
    };

    if (document.readyState === "complete") {
      hide();
      return;
    }

    window.addEventListener("load", hide);
    const fallback = setTimeout(hide, 8000);

    return () => {
      window.removeEventListener("load", hide);
      clearTimeout(fallback);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "28px",
        backgroundColor: "#0a1628",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.6s ease",
        pointerEvents: fading ? "none" : "all",
      }}
    >
      {/* Triangle loader */}
      <div className="page-loader-triangle" />

      {/* Text */}
      <div
        style={{
          textAlign: "center",
          color: "#c8d8e4",
          fontFamily: "'Hanken Grotesk', sans-serif",
          letterSpacing: "0.08em",
        }}
      >
        <p
          style={{
            fontSize: "0.85rem",
            textTransform: "uppercase",
            opacity: 0.7,
            margin: 0,
          }}
        >
          Loading your escape
        </p>
      </div>

      <style>{`
        .page-loader-triangle {
          --b: 25%;
          height: 80px;
          aspect-ratio: 1/cos(30deg);
          position: relative;
          clip-path: polygon(50% 0,100% 100%,0 100%,50% 0,50% var(--b),calc(var(--b)*cos(30deg)) calc(100% - var(--b)/2),calc(100% - var(--b)*cos(30deg)) calc(100% - var(--b)/2),50% var(--b));
          filter: blur(12px);
        }
        .page-loader-triangle::before {
          content: "";
          position: absolute;
          inset: -8% 0;
          background: conic-gradient(#0000 35%, #0B486B, #0000 65%);
          animation: loader-spin 2s linear infinite;
        }
        @keyframes loader-spin {
          to { rotate: 1turn; }
        }
      `}</style>
    </div>
  );
}
