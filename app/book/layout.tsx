import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Stay",
  description:
    "Reserve your dates at Nature Kingdom — a nature resort in Chikmagalur, Karnataka. Choose a package, select your dates, and we'll confirm via WhatsApp.",
  alternates: { canonical: "https://www.naturekingdomhomestay.com/book" },
  robots: { index: true, follow: true },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
