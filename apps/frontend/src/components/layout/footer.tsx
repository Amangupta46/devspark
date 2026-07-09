import Link from "next/link";
import { footerNavigation, legalNavigation, marketingNavigation } from "@/config/navigation";

export function Footer() {
  return (
    <footer className="border-border-subtle bg-surface-base w-full border-t py-12 md:py-16">
      <div className="max-w-container-xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="text-neutral-0 inline-block font-mono text-xl font-bold tracking-tight"
            >
              dev<span className="text-amber-400">spark</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-300">
              High-performance, premium digital solutions helping forward-thinking teams build the
              future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              {footerNavigation.map((item) => (
                <li key={`${item.label}-${item.href}`}>
                  <Link
                    href={item.href}
                    className="hover:text-neutral-0 text-sm text-neutral-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
              Services
            </h3>
            <ul className="mt-4 space-y-2">
              {marketingNavigation
                .find((n) => n.label === "Services")
                ?.children?.slice(0, 3)
                .map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="hover:text-neutral-0 text-sm text-neutral-300 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              {legalNavigation.map((item) => (
                <li key={`${item.label}-${item.href}`}>
                  <Link
                    href={item.href}
                    className="hover:text-neutral-0 text-sm text-neutral-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-border-subtle mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p suppressHydrationWarning className="text-xs text-neutral-400">
            &copy; {new Date().getFullYear()} DevSpark. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit DevSpark GitHub profile"
              className="text-xs text-neutral-400 transition-colors hover:text-neutral-200"
            >
              GitHub
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit DevSpark Twitter profile"
              className="text-xs text-neutral-400 transition-colors hover:text-neutral-200"
            >
              Twitter
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit DevSpark LinkedIn profile"
              className="text-xs text-neutral-400 transition-colors hover:text-neutral-200"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
