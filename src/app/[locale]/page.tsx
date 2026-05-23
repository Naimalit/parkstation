import Image from "next/image";
import Link from "next/link";
import { siteConfig, type Locale } from "@/lib/config";
import { getDictionary } from "@/lib/i18n";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const base = `/${locale}`;

  return (
    <>
      <section className="relative min-h-[70vh] overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="Park Station"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900/60 via-forest-900/40 to-forest-900/70" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-4 py-20 text-white">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-forest-200">
            {siteConfig.name}
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight md:text-6xl">
            {dict.home.tagline}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-forest-100">{dict.home.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={`${base}/menu`} className="btn-primary bg-white text-forest-800 hover:bg-forest-50">
              {dict.home.viewMenu}
            </Link>
            <Link href={`${base}/rezervo-tavoline`} className="btn-secondary border-white text-white hover:bg-white/10">
              {dict.home.reserveTable}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="card text-center">
            <p className="text-sm font-medium text-forest-600">{dict.home.openHours}</p>
            <p className="mt-2 text-xl font-bold text-forest-800">{dict.home.everyDay}</p>
            <p className="text-forest-700">{siteConfig.hours}</p>
          </div>
          <div className="card text-center">
            <p className="text-sm font-medium text-forest-600">{dict.home.location}</p>
            <p className="mt-2 font-semibold text-forest-800">{siteConfig.location[locale as Locale]}</p>
            <p className="mt-1 text-sm text-forest-600">{dict.home.parking}</p>
          </div>
          <div className="card text-center">
            <p className="text-sm font-medium text-forest-600">{dict.home.callUs}</p>
            <a href={`tel:${siteConfig.phoneTel}`} className="mt-2 block text-2xl font-bold text-forest-800 hover:text-forest-600">
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-forest-800 py-16 text-white">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="font-display text-3xl font-bold">{dict.nav.reserveVenue}</h2>
          <p className="mx-auto mt-3 max-w-lg text-forest-200">{dict.reserveVenue.subtitle}</p>
          <Link href={`${base}/rezervo-lokalin`} className="btn-primary mt-6 bg-white text-forest-800 hover:bg-forest-50">
            {dict.home.reserveVenue}
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image src="/images/about.jpg" alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="section-title">{dict.about.title}</h2>
          <p className="mt-4 leading-relaxed text-forest-700">{dict.about.text}</p>
          <Link href={`${base}/rreth-nesh`} className="btn-secondary mt-6 w-fit">
            {dict.nav.about}
          </Link>
        </div>
      </section>
    </>
  );
}
