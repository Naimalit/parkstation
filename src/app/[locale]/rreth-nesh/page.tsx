import Image from "next/image";
import type { Locale } from "@/lib/config";
import { getDictionary } from "@/lib/i18n";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="relative mb-10 aspect-[21/9] overflow-hidden rounded-2xl">
        <Image src="/images/about.jpg" alt="" fill className="object-cover" sizes="896px" />
      </div>
      <h1 className="section-title">{dict.about.title}</h1>
      <p className="mt-6 text-lg leading-relaxed text-forest-700">{dict.about.text}</p>
    </div>
  );
}
