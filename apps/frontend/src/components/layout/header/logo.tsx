import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2 focus:outline-none"
      data-component="logo"
      data-section="header"
      data-analytics="nav_logo"
    >
      <span className="text-neutral-0 font-mono text-xl font-bold tracking-tight">
        dev
        <span className="text-amber-400 transition-colors group-hover:text-amber-300">spark</span>
      </span>
    </Link>
  );
}
