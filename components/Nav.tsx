"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "@/lib/data";

const MENU_LINKS = [{ label: "Home", href: "/" }, ...NAV_LINKS];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close the menu whenever the page changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape or a tap outside the header closes it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-ink/95 backdrop-blur border-b border-white/10"
    >
      <nav
        aria-label="Main"
        className="mx-auto max-w-6xl px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4"
      >
        <Link href="/" className="flex items-center gap-2.5 min-w-0">
          <Image
            src="/images/logo-mark.png"
            alt="HeatedUpFitness home"
            width={44}
            height={44}
            priority
            className="h-12 w-12 shrink-0 object-contain"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 font-body text-sm text-mist">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`transition-colors hover:text-cream ${
                  isActive(link.href) ? "text-cream" : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className="hidden md:inline-block rounded-full bg-heat-gradient px-5 py-2 font-body font-semibold text-sm text-ink hover:opacity-90 transition-opacity"
        >
          Book a Consult
        </Link>

        {/* Hamburger (phones and tablets) */}
        <button
          ref={buttonRef}
          type="button"
          className="md:hidden relative h-11 w-11 shrink-0 rounded-full text-cream hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            aria-hidden="true"
            className={`absolute left-1/2 top-1/2 block h-0.5 w-5 -translate-x-1/2 bg-current transition-transform duration-200 ${
              open ? "rotate-45" : "-translate-y-[7px]"
            }`}
          />
          <span
            aria-hidden="true"
            className={`absolute left-1/2 top-1/2 block h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 bg-current transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            aria-hidden="true"
            className={`absolute left-1/2 top-1/2 block h-0.5 w-5 -translate-x-1/2 bg-current transition-transform duration-200 ${
              open ? "-rotate-45" : "translate-y-[6px]"
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden absolute inset-x-0 top-full bg-ink border-b border-white/10 shadow-2xl"
        >
          <ul className="mx-auto max-w-6xl px-4 sm:px-6 py-3 font-body">
            {MENU_LINKS.map((link) => (
              <li key={link.href} className="border-b border-white/5 last:border-0">
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`flex min-h-12 items-center text-lg ${
                    isActive(link.href) ? "text-cream font-semibold" : "text-mist"
                  } hover:text-cream`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 pb-2">
              <Link
                href="/contact"
                className="block text-center rounded-full bg-heat-gradient px-6 py-3.5 font-body font-semibold text-ink"
              >
                Book a Free Consult
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
