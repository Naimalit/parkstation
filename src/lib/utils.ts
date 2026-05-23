import type { Locale } from "./config";
import type { MenuCategory, MenuItem } from "./store";

export function getLocalizedName(
  item: { name_sq: string; name_mk: string; name_en: string },
  locale: Locale
): string {
  if (locale === "mk") return item.name_mk;
  if (locale === "en") return item.name_en;
  return item.name_sq;
}

export function getMenuByCategory(
  categories: MenuCategory[],
  items: MenuItem[],
  locale: Locale
) {
  return categories
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((cat) => ({
      ...cat,
      name: getLocalizedName(cat, locale),
      items: items
        .filter((i) => i.category_id === cat.id && i.active)
        .map((i) => ({ ...i, name: getLocalizedName(i, locale) })),
    }))
    .filter((cat) => cat.items.length > 0);
}

export function formatPrice(price: number, currency = "ден."): string {
  if (price === 0) return "—";
  return `${price} ${currency}`;
}

export function getMinReservationDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

export function getMaxReservationDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  return d.toISOString().split("T")[0];
}

export function isValidReservationDate(dateStr: string): boolean {
  const min = getMinReservationDate();
  const max = getMaxReservationDate();
  return dateStr >= min && dateStr <= max;
}

export function isValidTime(time: string): boolean {
  const [h, m] = time.split(":").map(Number);
  if (isNaN(h) || isNaN(m)) return false;
  const minutes = h * 60 + m;
  return minutes >= 10 * 60 && minutes <= 24 * 60;
}

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
