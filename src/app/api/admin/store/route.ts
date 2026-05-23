import { NextRequest, NextResponse } from "next/server";
import { readStore, writeStore } from "@/lib/store";
import { isAdminAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const store = await readStore();
  return NextResponse.json(store);
}

export async function PUT(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const current = await readStore();

    const updated = {
      ...current,
      categories: body.categories ?? current.categories,
      menuItems: body.menuItems ?? current.menuItems,
      tables: body.tables ?? current.tables,
      tableReservations: body.tableReservations ?? current.tableReservations,
      venueReservations: body.venueReservations ?? current.venueReservations,
    };

    await writeStore(updated);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
