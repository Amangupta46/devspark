import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In — DevSpark",
  description:
    "Sign in to your DevSpark account to manage projects, track progress, and collaborate with your team.",
  alternates: { canonical: "/login" },
  openGraph: {
    title: "Sign In to DevSpark",
    description: "Your command center for premium software development.",
    url: "https://devspark.dev/login",
    siteName: "DevSpark",
    locale: "en_US",
    type: "website",
  },
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
