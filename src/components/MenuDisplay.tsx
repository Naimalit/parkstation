import type { Locale } from "@/lib/config";
import { siteConfig } from "@/lib/config";
import type { Dictionary } from "@/lib/i18n";
import { getMenuByCategory, formatPrice } from "@/lib/utils";
import type { MenuCategory, MenuItem } from "@/lib/store";

interface MenuDisplayProps {
  locale: Locale;
  dict: Dictionary;
  categories: MenuCategory[];
  items: MenuItem[];
}

export function MenuDisplay({
  locale,
  dict,
  categories,
  items,
}: MenuDisplayProps) {
  const menu = getMenuByCategory(categories, items, locale);

  return (
    <div className="space-y-10">
      {menu.map((category) => (
        <section key={category.id}>
          <h2 className="mb-2 font-display text-2xl font-bold text-forest-800">
            {category.name}
          </h2>
          {category.id === "mixers" && (
            <p className="mb-4 text-sm text-forest-600">{dict.menu.mixerNote}</p>
          )}
          <div className="card divide-y divide-forest-50 !p-0">
            {category.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <span className="font-medium text-forest-800">{item.name}</span>
                <div className="shrink-0 text-right text-sm font-semibold text-forest-700">
                  {item.is_mixer ? (
                    <span className="text-forest-400">—</span>
                  ) : item.price_large ? (
                    <div className="space-y-0.5">
                      <div>
                        {dict.menu.small}: {formatPrice(item.price, siteConfig.currency)}
                      </div>
                      <div>
                        {dict.menu.large}: {formatPrice(item.price_large, siteConfig.currency)}
                      </div>
                    </div>
                  ) : (
                    formatPrice(item.price, siteConfig.currency)
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
