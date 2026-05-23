import { NextRequest, NextResponse } from "next/server";
import {
  readStore,
  writeStore,
  generateId,
  type TableReservation,
  type VenueReservation,
} from "@/lib/store";
import { isValidReservationDate, isValidTime } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { table_id, name, phone, email, guests, date, time, notes } = body;

    if (!table_id || !name || !phone || !email || !guests || !date || !time) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (!isValidReservationDate(date)) {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }

    if (!isValidTime(time)) {
      return NextResponse.json({ error: "Invalid time" }, { status: 400 });
    }

    const store = await readStore();
    const table = store.tables.find((t) => t.id === Number(table_id) && t.active);
    if (!table) {
      return NextResponse.json({ error: "Invalid table" }, { status: 400 });
    }

    const reservation: TableReservation = {
      id: generateId(),
      table_id: Number(table_id),
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: String(email).trim(),
      guests: Number(guests),
      date: String(date),
      time: String(time),
      notes: notes ? String(notes).trim() : undefined,
      status: "pending",
      created_at: new Date().toISOString(),
    };

    store.tableReservations.push(reservation);
    await writeStore(store);

    return NextResponse.json({ success: true, id: reservation.id });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
