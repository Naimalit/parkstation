import Link from "next/link";
import type { Locale } from "@/lib/config";
import { siteConfig } from "@/lib/config";
import type { Dictionary } from "@/lib/i18n";
import { t } from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function Footer({ locale, dict }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-forest-100 bg-forest-900 text-forest-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-bold text-white">
            {siteConfig.shortName}
          </p>
          <p className="mt-1 text-sm text-forest-200">@ Park Chair</p>
          <p className="mt-3 text-sm">{siteConfig.location[locale]}</p>
        </div>

        <div>
          <p className="font-semibold text-white">{dict.contact.hours}</p>
          <p className="mt-2 text-sm">{dict.home.everyDay}: {siteConfig.hours}</p>
          <a
            href={`tel:${siteConfig.phoneTel}`}
            className="mt-3 block text-sm font-medium text-forest-200 hover:text-white"
          >
            {siteConfig.phone}
          </a>
        </div>

        <div>
          <p className="font-semibold text-white">{dict.contact.social}</p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Instagram
            </a>
            <a href={siteConfig.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              TikTok
            </a>
            <Link href={`/${locale}/kontakt`} className="hover:text-white">
              {dict.nav.contact}
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-forest-800 px-4 py-4 text-center text-xs text-forest-300">
        {t(dict, "footer.rights", { year })}
      </div>
    </footer>
  );
}
