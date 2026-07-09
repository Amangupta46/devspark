import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Start Your Project",
  description:
    "Get in touch with the DevSpark team. Share your project vision and we will respond within 24 hours with a tailored strategy.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact DevSpark — Start Your Project",
    description: "Share your project vision and get a tailored response within 24 hours.",
    url: "https://devspark.dev/contact",
    siteName: "DevSpark",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
