import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProcessSection } from "@/components/sections/process";

export const metadata: Metadata = {
  title: "Our Methodology — How We Build Software",
  description:
    "A systematic, transparent approach to software development — from discovery and strategy through design, engineering, launch, and scale. Learn how DevSpark delivers quality at every stage.",
  alternates: {
    canonical: "/methodology",
  },
  openGraph: {
    title: "Our Methodology — How We Build Software | DevSpark",
    description:
      "A systematic, transparent approach to software development — from discovery and strategy through design, engineering, launch, and scale.",
    url: "https://devspark.dev/methodology",
    siteName: "DevSpark",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MethodologyPage() {
  return (
    <div className="bg-surface-ground flex min-h-screen flex-col text-neutral-50">
      <Header />
      <main className="flex-grow pt-18">
        <ProcessSection />
      </main>
      <Footer />
    </div>
  );
}
