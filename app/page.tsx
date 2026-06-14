import type { Metadata } from "next";
import ClientApp from "@/src/App";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://naturekingdom.in/",
  },
};

export default function Page() {
  return <ClientApp />;
}
