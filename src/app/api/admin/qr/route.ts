import QRCode from "qrcode";
import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getSiteUrl } from "@/lib/utils";
import { readStore } from "@/lib/store";

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tableId = request.nextUrl.searchParams.get("table");
  const format = request.nextUrl.searchParams.get("format") || "png";

  if (!tableId) {
    return NextResponse.json({ error: "Missing table param" }, { status: 400 });
  }

  const store = await readStore();
  const table = store.tables.find((t) => t.id === Number(tableId));
  if (!table) {
    return NextResponse.json({ error: "Table not found" }, { status: 404 });
  }

  const url = `${getSiteUrl()}/sq/t/${table.id}`;

  if (format === "svg") {
    const svg = await QRCode.toString(url, { type: "svg", margin: 2, width: 300 });
    return new NextResponse(svg, {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }

  const png = await QRCode.toBuffer(url, { margin: 2, width: 400 });
  return new NextResponse(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
}
