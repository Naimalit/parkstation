import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/config";
import { getDictionary, t } from "@/lib/i18n";
import { readStore } from "@/lib/store";

export default async function TableQrPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const tableId = Number(id);
  const store = await readStore();
  const table = store.tables.find((t) => t.id === tableId && t.active);

  if (!table) notFound();

  const dict = await getDictionary(locale as Locale);
  const base = `/${locale}`;

  return (
    <div className="mx-auto max-w-md px-4 py-16 text-center">
      <div className="rainbow-bar mb-8 rounded-full" />
      <h1 className="font-display text-3xl font-bold text-forest-800">
        {t(dict, "tableQr.title", { number: table.number })}
      </h1>
      <p className="mt-2 text-forest-600">{dict.tableQr.scanHint}</p>
      <p className="mt-1 text-sm text-forest-500">
        {table.capacity} {locale === "en" ? "guests" : locale === "mk" ? "лица" : "persona"}
      </p>

      <div className="mt-10 flex flex-col gap-4">
        <Link href={`${base}/menu`} className="btn-primary">
          {dict.tableQr.viewMenu}
        </Link>
        <Link href={`${base}/rezervo-tavoline?table=${table.id}`} className="btn-secondary">
          {dict.tableQr.reserveThis}
        </Link>
      </div>
    </div>
  );
}
