import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageLoader from "@/components/PageLoader";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const BASE_URL = "https://www.naturekingdomhomestay.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  /* ── Title ─────────────────────────────────────────────────────── */
  title: {
    default: "Nature Kingdom — Nature Resort in Chikmagalur",
    template: "%s | Nature Kingdom Chikmagalur",
  },

  /* ── Description ────────────────────────────────────────────────── */
  description:
    "Wake up to mist-covered hills, explore coffee estates, and spend evenings around a bonfire. Nature Kingdom is a peaceful nature resort in Chikmagalur, Karnataka — ideal for families, couples, and weekend travellers.",

  /* ── Robots ─────────────────────────────────────────────────────── */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  /* ── Open Graph ─────────────────────────────────────────────────── */
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Nature Kingdom",
    title: "Nature Kingdom — Nature Resort in Chikmagalur",
    description:
      "Wake up to mist-covered hills, explore coffee estates, and spend evenings around a bonfire. A peaceful nature resort in Chikmagalur, Karnataka.",
    images: [
      {
        url: "/assets/nightvilla.png",
        width: 1200,
        height: 630,
        alt: "Nature Kingdom resort at night, Chikmagalur, Karnataka",
      },
    ],
  },

  /* ── Twitter Card ───────────────────────────────────────────────── */
  twitter: {
    card: "summary_large_image",
    title: "Nature Kingdom — Nature Resort in Chikmagalur",
    description:
      "Wake up to mist-covered hills. Bonfire nights, forest mornings, and honest hospitality in Chikmagalur, Karnataka.",
    images: ["/assets/nightvilla.png"],
  },

  /* ── Keywords ───────────────────────────────────────────────────── */
  keywords: [
    "nature resort Chikmagalur",
    "homestay Chikmagalur",
    "Chikmagalur weekend getaway",
    "bonfire resort Karnataka",
    "coffee estate stay Chikmagalur",
    "family resort Chikmagalur",
    "couple resort Chikmagalur",
    "Nature Kingdom Chikmagalur",
  ],

  /* ── Authors ────────────────────────────────────────────────────── */
  authors: [{ name: "Nature Kingdom" }],

  /* ── Icons ──────────────────────────────────────────────────────── */
  icons: {
    icon: "/logobest.png",
    shortcut: "/logobest.png",
    apple: "/logobest.png",
  },
};

/* ── Structured Data ────────────────────────────────────────────────
   LodgingBusiness covers LocalBusiness as its parent type.
   geo omitted: add latitude/longitude once the property pin is
   confirmed in Google Maps (replace this comment with a geo block).
──────────────────────────────────────────────────────────────────── */
const lodgingSchema = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Nature Kingdom",
  description:
    "A nature resort and homestay in Chikmagalur, Karnataka, surrounded by coffee estates, misty hills, and the Western Ghats. Ideal for families, couples, and nature lovers.",
  url: BASE_URL,
  telephone: "+91 9148678686",
  image: `${BASE_URL}/assets/nightvilla.png`,
  priceRange: "₹₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, UPI",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bommenahalli, Mallenahalli Post",
    addressLocality: "Chikmagalur",
    addressRegion: "Karnataka",
    postalCode: "577137",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 13.481783280374168,
    longitude: 75.79696558049666,
  },
  checkinTime: "12:00",
  checkoutTime: "11:00",
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "BBQ Facilities", value: true },
    { "@type": "LocationFeatureSpecification", name: "Bonfire", value: true },
    { "@type": "LocationFeatureSpecification", name: "Dining Area", value: true },
    { "@type": "LocationFeatureSpecification", name: "Flat TV", value: true },
    { "@type": "LocationFeatureSpecification", name: "Housekeeping", value: true },
    { "@type": "LocationFeatureSpecification", name: "Living Room", value: true },
    { "@type": "LocationFeatureSpecification", name: "Parking", value: true },
    { "@type": "LocationFeatureSpecification", name: "Power Backup", value: true },
    { "@type": "LocationFeatureSpecification", name: "Terrace", value: true },
    { "@type": "LocationFeatureSpecification", name: "Washing Machine", value: true },
  ],
  touristType: [
    "Couples",
    "Families",
    "Nature Lovers",
    "Weekend Travellers",
    "Honeymoon Travellers",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts — display=swap prevents invisible text during load */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&display=swap"
          rel="stylesheet"
        />

        {/* Structured Data — LodgingBusiness (covers LocalBusiness) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingSchema) }}
        />
      </head>
      <body>
        <PageLoader />
        {children}

        {/* Floating WhatsApp button */}
        <WhatsAppButton />

        {/* Google Analytics 4 — only loads when measurement ID is set */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
