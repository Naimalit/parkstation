"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/lib/config";
import type { Dictionary } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LogoLink } from "./Logo";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export function Header({ locale, dict }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const base = `/${locale}`;

  const links = [
    { href: base, label: dict.nav.home },
    { href: `${base}/menu`, label: dict.nav.menu },
    { href: `${base}/rezervo-tavoline`, label: dict.nav.reserveTable },
    { href: `${base}/rezervo-lokalin`, label: dict.nav.reserveVenue },
    { href: `${base}/rreth-nesh`, label: dict.nav.about },
    { href: `${base}/kontakt`, label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm">
      <div className="rainbow-bar" />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <LogoLink href={base} showSubtitle />

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-forest-700 transition hover:text-forest-900"
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher locale={locale} />
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <svg className="h-6 w-6 text-forest-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-forest-100 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-forest-700"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <LanguageSwitcher locale={locale} />
          </nav>
        </div>
      )}
    </header>
  );
}
