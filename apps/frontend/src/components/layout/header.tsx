"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLoader } from "@/experience/providers/loader-provider";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoaded } = useLoader();

  return (
    <header 
      className={`border-border-subtle bg-surface-base/80 sticky top-0 z-50 w-full border-b backdrop-blur-md transition-opacity duration-1000 ease-out ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-container-xl mx-auto flex h-18 items-center justify-between px-6 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-neutral-0 font-mono text-xl font-bold tracking-tight">
            dev<span className="text-amber-400">spark</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#services"
            className="hover:text-neutral-0 text-sm font-medium text-neutral-200 transition-colors"
          >
            Services
          </Link>
          <Link
            href="#portfolio"
            className="hover:text-neutral-0 text-sm font-medium text-neutral-200 transition-colors"
          >
            Portfolio
          </Link>
          <Link
            href="#about"
            className="hover:text-neutral-0 text-sm font-medium text-neutral-200 transition-colors"
          >
            About
          </Link>
          <Link
            href="#blog"
            className="hover:text-neutral-0 text-sm font-medium text-neutral-200 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="#contact"
            className="hover:text-neutral-0 text-sm font-medium text-neutral-200 transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Action Button */}
        <div className="hidden md:block">
          <Link
            href="#contact"
            className="inline-flex h-10 items-center justify-center rounded-md bg-amber-400 px-5 text-sm font-semibold text-neutral-950 transition-all hover:bg-amber-300 hover:shadow-[0_0_12px_var(--amber-glow-sm)] active:scale-95"
          >
            Start a Project
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="border-border-default hover:bg-surface-elevated flex h-10 w-10 items-center justify-center rounded-md border text-neutral-200 md:hidden"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="border-border-subtle bg-surface-base fixed inset-x-0 top-18 z-40 border-b px-6 py-8 shadow-2xl md:hidden">
          <nav className="flex flex-col gap-6">
            <Link
              href="#services"
              onClick={() => setIsOpen(false)}
              className="hover:text-neutral-0 text-lg font-medium text-neutral-200"
            >
              Services
            </Link>
            <Link
              href="#portfolio"
              onClick={() => setIsOpen(false)}
              className="hover:text-neutral-0 text-lg font-medium text-neutral-200"
            >
              Portfolio
            </Link>
            <Link
              href="#about"
              onClick={() => setIsOpen(false)}
              className="hover:text-neutral-0 text-lg font-medium text-neutral-200"
            >
              About
            </Link>
            <Link
              href="#blog"
              onClick={() => setIsOpen(false)}
              className="hover:text-neutral-0 text-lg font-medium text-neutral-200"
            >
              Blog
            </Link>
            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="hover:text-neutral-0 text-lg font-medium text-neutral-200"
            >
              Contact
            </Link>
            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-12 w-full items-center justify-center rounded-md bg-amber-400 text-base font-semibold text-neutral-950 hover:bg-amber-300"
            >
              Start a Project
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
