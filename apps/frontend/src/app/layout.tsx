import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ExperienceProvider } from "@/experience/providers/experience-provider";
import "../styles/globals.css";

const inter = Inter({
  variable: "--font-sans-fallback",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-fallback",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DevSpark — Premium Software Development Agency & SaaS Platform",
    template: "%s | DevSpark",
  },
  description:
    "We design and build high-performance, conversion-focused web applications, mobile apps, and custom AI systems for startups and enterprises refusing to compromise on quality.",
  metadataBase: new URL("https://devspark.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DevSpark — Premium Software Development Agency & SaaS Platform",
    description:
      "High-performance, conversion-focused web applications, mobile apps, and custom AI systems built by senior engineers.",
    url: "https://devspark.dev",
    siteName: "DevSpark",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
      <body className="bg-surface-ground flex flex-col text-neutral-50 antialiased">
        <ExperienceProvider>{children}</ExperienceProvider>
      </body>
    </html>
  );
}
