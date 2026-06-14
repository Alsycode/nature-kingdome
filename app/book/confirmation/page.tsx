"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

const WHATSAPP = process.env.NEXT_PUBLIC_CLIENT_WHATSAPP ?? "";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") ?? "";
  const name = searchParams.get("name") ?? "there";

  const waNumber = WHATSAPP.replace(/\D/g, "");
  const waMessage = encodeURIComponent(
    `Hi! I just made a booking at Nature Kingdom. My booking reference is ${ref}. Could you help me with the payment details?`
  );
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <div className="min-h-screen bg-[#0e1a13] text-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-[#e9c349]/10 border border-[#e9c349]/20 flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e9c349" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <p className="text-[10px] tracking-[0.35em] text-[#e9c349] uppercase font-sans mb-3">Booking Received</p>
        <h1 className="text-3xl font-serif mb-2">Thank you, {decodeURIComponent(name)}!</h1>
        <p className="text-white/50 text-sm leading-relaxed mb-8">
          Your dates have been reserved. To confirm your booking, please complete the payment via WhatsApp.
        </p>

        {/* Booking Ref */}
        <div className="bg-white/[0.03] border border-white/5 rounded-xl px-6 py-4 mb-8">
          <p className="text-[10px] text-white/30 tracking-widest uppercase mb-1">Booking Reference</p>
          <p className="text-2xl font-mono font-bold text-[#e9c349] tracking-widest">{ref}</p>
          <p className="text-[10px] text-white/30 mt-1">Keep this for your records</p>
        </div>

        {/* WhatsApp CTA */}
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white font-semibold py-4 rounded-xl hover:bg-[#22c35e] transition text-sm mb-4"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Message Us on WhatsApp
        </a>

        <p className="text-xs text-white/30 mb-8">
          WhatsApp: {WHATSAPP} · We respond within 2 hours
        </p>

        {/* What happens next */}
        <div className="text-left space-y-3 bg-white/[0.02] border border-white/5 rounded-xl p-5">
          <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase font-sans mb-2">What happens next</p>
          {[
            "Message us on WhatsApp with your booking reference",
            "We share UPI / payment details with you",
            "Send payment & receive your booking confirmation",
            "Pack your bags — we'll be waiting!",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-[#e9c349]/10 text-[#e9c349] text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
              <p className="text-sm text-white/50">{step}</p>
            </div>
          ))}
        </div>

        <a href="/" className="block mt-8 text-xs text-white/25 hover:text-white/50 transition">
          ← Back to Nature Kingdom
        </a>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0e1a13]" />}>
      <ConfirmationContent />
    </Suspense>
  );
}
