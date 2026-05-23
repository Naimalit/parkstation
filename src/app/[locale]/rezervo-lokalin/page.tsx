import type { Locale } from "@/lib/config";
import { getDictionary } from "@/lib/i18n";
import { VenueReservationForm } from "@/components/VenueReservationForm";

export default async function ReserveVenuePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="section-title">{dict.reserveVenue.title}</h1>
        <p className="mt-2 text-forest-600">{dict.reserveVenue.subtitle}</p>
      </div>
      <VenueReservationForm dict={dict} />
    </div>
  );
}
