import type { Locale } from "./config";

const dictionaries = {
  sq: () => import("@/locales/sq.json").then((m) => m.default),
  mk: () => import("@/locales/mk.json").then((m) => m.default),
  en: () => import("@/locales/en.json").then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["sq"]>>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

export function t(
  dict: Dictionary,
  key: string,
  vars?: Record<string, string | number>
): string {
  const keys = key.split(".");
  let value: unknown = dict;
  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }
  if (typeof value !== "string") return key;
  if (!vars) return value;
  return Object.entries(vars).reduce(
    (str, [k, v]) => str.replace(`{${k}}`, String(v)),
    value
  );
}
