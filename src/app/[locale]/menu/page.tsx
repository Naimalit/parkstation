import type { Locale } from "@/lib/config";
import { getDictionary } from "@/lib/i18n";
import { readStore } from "@/lib/store";
import { MenuDisplay } from "@/components/MenuDisplay";

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const store = await readStore();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="section-title">{dict.menu.title}</h1>
        <p className="mt-2 text-forest-600">{dict.menu.subtitle}</p>
      </div>
      <MenuDisplay
        locale={locale as Locale}
        dict={dict}
        categories={store.categories}
        items={store.menuItems}
      />
    </div>
  );
}
