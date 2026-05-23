"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/config";
import { locales, localeNames } from "@/lib/config";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  function getLocalizedPath(newLocale: Locale) {
    const segments = pathname.split("/");
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    return segments.join("/") || `/${newLocale}`;
  }

  return (
    <div className="flex gap-1 rounded-full border border-forest-200 bg-white p-1 text-xs font-medium">
      {locales.map((l) => (
        <Link
          key={l}
          href={getLocalizedPath(l)}
          className={`rounded-full px-2.5 py-1 transition ${
            l === locale
              ? "bg-forest-700 text-white"
              : "text-forest-600 hover:bg-forest-50"
          }`}
        >
          {localeNames[l]}
        </Link>
      ))}
    </div>
  );
}
