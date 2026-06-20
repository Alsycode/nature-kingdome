import type { MetadataRoute } from "next";

const BASE_URL = "https://www.naturekingdomhomestay.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/book/confirmation"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
