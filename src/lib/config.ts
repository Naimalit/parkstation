export const locales = ["sq", "mk", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "sq";

export const localeNames: Record<Locale, string> = {
  sq: "Shqip",
  mk: "Македонски",
  en: "English",
};

export const siteConfig = {
  name: "Park Station @ Park Chair",
  shortName: "PARK STATION",
  phone: "071-206-221",
  phoneTel: "+38971206221",
  hours: "10:00 – 00:00",
  location: {
    sq: "Parku i Çairit, Shkup / Çair",
    mk: "Чаирски Парк, Скопје / Чаир",
    en: "Cair Park, Skopje / Cair",
  },
  instagram: "https://www.instagram.com/park.station/",
  tiktok: "https://www.tiktok.com/@park.station1",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2960.5!2d21.4456612!3d42.0153679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1354150dd7000001%3A0x47f9b3b0cb6f95a6!2sPark%20Chair!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s",
  mapsLink:
    "https://www.google.com/maps/place/Park+Chair/@42.0154025,21.4456556,54m",
  maxVenueGuests: 40,
  tableCount: 10,
  currency: "ден.",
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
