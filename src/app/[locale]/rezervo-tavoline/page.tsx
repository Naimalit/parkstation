import type { Locale } from "@/lib/config";
import { getDictionary } from "@/lib/i18n";
import { readStore } from "@/lib/store";
import { TableReservationForm } from "@/components/TableReservationForm";

export default async function ReserveTablePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ table?: string }>;
}) {
  const { locale } = await params;
  const { table } = await searchParams;
  const dict = await getDictionary(locale as Locale);
  const store = await readStore();
  const tableId = table ? Number(table) : undefined;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="section-title">{dict.reserveTable.title}</h1>
        <p className="mt-2 text-forest-600">{dict.reserveTable.subtitle}</p>
      </div>
      <TableReservationForm
        dict={dict}
        tables={store.tables}
        defaultTableId={tableId}
      />
    </div>
  );
}
