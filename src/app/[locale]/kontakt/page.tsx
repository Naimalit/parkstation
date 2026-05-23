import type { Locale } from "@/lib/config";
import { siteConfig } from "@/lib/config";
import { getDictionary } from "@/lib/i18n";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="section-title mb-8">{dict.contact.title}</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div className="card">
            <p className="text-sm font-medium text-forest-600">{dict.contact.phone}</p>
            <a href={`tel:${siteConfig.phoneTel}`} className="mt-1 block text-2xl font-bold text-forest-800">
              {siteConfig.phone}
            </a>
          </div>
          <div className="card">
            <p className="text-sm font-medium text-forest-600">{dict.contact.hours}</p>
            <p className="mt-1 text-lg font-semibold">{siteConfig.hours}</p>
            <p className="text-sm text-forest-600">{dict.home.everyDay}</p>
          </div>
          <div className="card">
            <p className="text-sm font-medium text-forest-600">{dict.contact.location}</p>
            <p className="mt-1 font-semibold">{siteConfig.location[locale as Locale]}</p>
            <p className="mt-2 text-sm text-forest-600">{dict.contact.parking}</p>
            <a
              href={siteConfig.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary mt-4 inline-flex text-sm"
            >
              {dict.contact.openMap}
            </a>
          </div>
          <div className="card">
            <p className="text-sm font-medium text-forest-600">{dict.contact.social}</p>
            <div className="mt-3 flex gap-4">
              <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="font-medium text-forest-700 hover:text-forest-900">
                Instagram
              </a>
              <a href={siteConfig.tiktok} target="_blank" rel="noopener noreferrer" className="font-medium text-forest-700 hover:text-forest-900">
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-forest-100 shadow-sm">
          <iframe
            src={siteConfig.mapsEmbed}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Park Station location"
          />
        </div>
      </div>
    </div>
  );
}
