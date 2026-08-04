import type { Metadata } from "next";
import Image from "next/image";
import StayInfoShell from "@/components/StayInfoShell";

const BASE_URL = "https://www.naturekingdomhomestay.com";
const PAGE_URL = `${BASE_URL}/stay-info/payment/`;

export const metadata: Metadata = {
  title: "Payment Details — Nature Kingdom Homestay",
  description: "UPI and bank transfer details to confirm your stay at Nature Kingdom Homestay, Chikmagalur.",
  alternates: { canonical: PAGE_URL },
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "Nature Kingdom",
    title: "Payment Details — Nature Kingdom Homestay",
    description: "UPI and bank transfer details to confirm your stay at Nature Kingdom Homestay.",
    locale: "en_IN",
  },
};

const BANK_DETAILS = [
  { label: "Account Name", value: "NATURE KINGDOM ACCOUNT" },
  { label: "Account Number", value: "073905011709" },
  { label: "IFSC Code", value: "ICIC0000739" },
  { label: "Account Type", value: "Current" },
  { label: "Bank & Branch", value: "ICICI Bank · Chikkamagaluru" },
];

export default function PaymentPage() {
  return (
    <StayInfoShell>
      <section className="max-w-[900px] mx-auto px-6 sm:px-12 py-10 sm:py-16">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.35em] font-semibold text-[#e9c349] uppercase font-sans">
            Payment Details
          </span>
          <h1 className="font-headline text-3xl sm:text-4xl text-on-surface mt-4 mb-5">
            Ready to Confirm Your Stay
          </h1>
          <p className="font-sans font-light text-sm text-on-surface/50 max-w-lg mx-auto leading-relaxed">
            Please confirm your dates with us on WhatsApp before making any payment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* UPI / QR */}
          <div className="border border-white/10 p-8 flex flex-col items-center text-center gap-4">
            <p className="text-[10px] tracking-[0.25em] uppercase text-on-surface/40 font-sans">Scan to Pay (UPI)</p>
            <div className="w-44 h-44 bg-white p-3 flex items-center justify-center">
              <Image
                src="/upi-qr.jpg"
                alt="UPI payment QR code for Nature Kingdom Homestay"
                width={265}
                height={275}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="font-sans font-light text-xs text-on-surface/40 leading-relaxed">
              Scan with any UPI app to pay Nature Kingdom Homestay.
            </p>
          </div>

          {/* Bank details */}
          <div className="border border-white/10 p-8 flex flex-col gap-4 justify-center">
            <p className="text-[10px] tracking-[0.25em] uppercase text-on-surface/40 font-sans mb-1">Bank Transfer</p>
            {BANK_DETAILS.map(({ label, value }) => (
              <div key={label}>
                <p className="text-[9px] tracking-[0.2em] uppercase text-on-surface/35 font-sans mb-1">{label}</p>
                <p className="font-sans text-sm text-on-surface/85 leading-relaxed tracking-wide">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <a
            href="https://wa.me/919900101868?text=Hi%2C%20I%27d%20like%20to%20confirm%20my%20stay%20at%20Nature%20Kingdom"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-editorial inline-block px-10 py-3.5 text-[10px] tracking-[0.25em] text-[#e9c349]"
          >
            Confirm on WhatsApp
          </a>
        </div>
      </section>
    </StayInfoShell>
  );
}
