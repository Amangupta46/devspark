import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Manrope } from "next/font/google";
import { ExperienceProvider } from "@/experience/providers/experience-provider";
import { AuthProvider } from "@/lib/auth/auth-provider";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "sonner";
import "../styles/globals.css";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

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

const manrope = Manrope({
  variable: "--font-heading-fallback",
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
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${manrope.variable} antialiased`}
    >
      <body className="bg-surface-ground flex flex-col text-neutral-50 antialiased">
        <QueryProvider>
          <ExperienceProvider>
            <AuthProvider>{children}</AuthProvider>
          </ExperienceProvider>
        </QueryProvider>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
