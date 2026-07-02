"use client";

import Link from "next/link";
import { motion } from "motion/react";

const ease = [0.25, 1, 0.5, 1] as [number, number, number, number];

export default function NotFound() {
  return (
    <main
      style={{ background: "#0a0a0a", color: "#f5f5f0", minHeight: "100vh" }}
      className="flex flex-col items-center justify-center px-6 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="max-w-lg"
      >
        <p
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            color: "#e9c349",
            letterSpacing: "0.25em",
            fontSize: "0.75rem",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}
        >
          404 — Page Not Found
        </p>

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            fontWeight: 400,
            lineHeight: 1.15,
            marginBottom: "1.5rem",
          }}
        >
          Lost in the mountains?
        </h1>

        <p
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            color: "#c3c8c2",
            fontSize: "1rem",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
          }}
        >
          The page you are looking for does not exist or may have moved.
          Head back home and we will help you find your way.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            style={{
              border: "1px solid rgba(233,195,73,0.5)",
              color: "#e9c349",
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              padding: "0.875rem 2rem",
              textDecoration: "none",
              transition: "all 0.4s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#e9c349";
              e.currentTarget.style.color = "#0a0a0a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#e9c349";
            }}
          >
            Back to Home
          </Link>

          <Link
            href="/book"
            style={{
              border: "1px solid rgba(189,202,192,0.3)",
              color: "#bdcac0",
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              padding: "0.875rem 2rem",
              textDecoration: "none",
              transition: "all 0.4s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(189,202,192,0.6)";
              e.currentTarget.style.color = "#f5f5f0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(189,202,192,0.3)";
              e.currentTarget.style.color = "#bdcac0";
            }}
          >
            Book a Stay
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
