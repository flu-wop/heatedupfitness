import Link from "next/link";
import { NAV_LINKS, BUSINESS } from "@/lib/data";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-ink/95 backdrop-blur border-b border-white/10">
      <nav className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-2xl tracking-wide text-cream">
          HEATED<span className="text-heat-gradient">UP</span>
        </Link>
        <ul className="hidden md:flex items-center gap-8 font-body text-sm text-mist">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-cream transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className="rounded-full bg-heat-gradient px-5 py-2 font-body font-semibold text-sm text-ink hover:opacity-90 transition-opacity"
        >
          Book a Consult
        </Link>
      </nav>
    </header>
  );
}
