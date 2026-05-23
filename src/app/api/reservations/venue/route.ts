import { NextRequest, NextResponse } from "next/server";
import {
  readStore,
  writeStore,
  generateId,
  type VenueReservation,
} from "@/lib/store";
import { isValidReservationDate, isValidTime } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, guests, date, time, event_type, notes } = body;

    if (!name || !phone || !email || !guests || !date || !time || !event_type) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (!isValidReservationDate(date)) {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }

    if (!isValidTime(time)) {
      return NextResponse.json({ error: "Invalid time" }, { status: 400 });
    }

    if (Number(guests) > siteConfig.maxVenueGuests) {
      return NextResponse.json({ error: "Too many guests" }, { status: 400 });
    }

    const store = await readStore();

    const reservation: VenueReservation = {
      id: generateId(),
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: String(email).trim(),
      guests: Number(guests),
      date: String(date),
      time: String(time),
      event_type: String(event_type),
      notes: notes ? String(notes).trim() : undefined,
      status: "pending",
      created_at: new Date().toISOString(),
    };

    store.venueReservations.push(reservation);
    await writeStore(store);

    return NextResponse.json({ success: true, id: reservation.id });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
