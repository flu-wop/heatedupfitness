import Image from "next/image";
import Link from "next/link";
import { BUSINESS } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-ink text-mist border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-1 gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Image src="/images/logo-mark.png" alt="HeatedUpFitness" width={56} height={56} className="h-14 w-14 object-contain" />
          </div>
          <p className="text-sm leading-relaxed">{BUSINESS.tagline}</p>
          <p className="text-xs mt-3 opacity-70">{BUSINESS.hashtag}</p>
        </div>
        <div>
          <h2 className="font-body font-semibold text-cream text-sm mb-3 uppercase tracking-wide">
            Contact
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`mailto:${BUSINESS.email}`} className="hover:text-cream">
                {BUSINESS.email}
              </a>
            </li>
            <li>
              <a href={`tel:${BUSINESS.phoneRaw}`} className="hover:text-cream">
                {BUSINESS.phone}
              </a>
            </li>
            <li className="opacity-70">{BUSINESS.serviceArea}</li>
          </ul>
        </div>
        <div>
          <h2 className="font-body font-semibold text-cream text-sm mb-3 uppercase tracking-wide">
            Legal
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/legal/privacy" className="hover:text-cream">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/legal/terms" className="hover:text-cream">Terms of Service</Link>
            </li>
            <li>
              <Link href="/legal/refund" className="hover:text-cream">Refund Policy</Link>
            </li>
            <li>
              <Link href="/legal/waiver" className="hover:text-cream">Health & Liability Waiver</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs opacity-80">
        © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
        <span className="mt-1 block">
          Designed by{" "}
          <a href="https://in-flu-ential.vercel.app" target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">IN-FLU-ENTIAL</a>
        </span>
      </div>
    </footer>
  );
}
