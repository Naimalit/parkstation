import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { readStore } from "@/lib/store";
import { getSiteUrl } from "@/lib/utils";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const store = await readStore();
  const baseUrl = getSiteUrl();

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Park Station QR Codes</title>
  <style>
    @page { size: A4; margin: 15mm; }
    body { font-family: Georgia, serif; color: #2D5016; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .card {
      border: 2px solid #2D5016;
      border-radius: 12px;
      padding: 16px;
      text-align: center;
      page-break-inside: avoid;
    }
    .rainbow {
      height: 4px;
      background: linear-gradient(90deg, #E53935, #FB8C00, #FDD835, #43A047, #1E88E5, #8E24AA);
      border-radius: 2px;
      margin-bottom: 12px;
    }
    h1 { text-align: center; font-size: 24px; margin-bottom: 8px; }
    h2 { font-size: 18px; margin: 8px 0; }
    p { font-size: 12px; margin: 4px 0; color: #447834; }
    img { width: 180px; height: 180px; }
    .langs { font-size: 10px; color: #666; margin-top: 8px; }
  </style>
</head>
<body>
  <h1>PARK STATION @ Park Chair</h1>
  <p style="text-align:center;margin-bottom:24px;">Skanoni për menu & rezervim · Scan for menu & reservation</p>
  <div class="grid">
    ${store.tables
      .filter((t) => t.active)
      .map(
        (t) => `
    <div class="card">
      <div class="rainbow"></div>
      <h2>Tavolina ${t.number}</h2>
      <p>Table ${t.number} · Мasa ${t.number}</p>
      <img src="${baseUrl}/api/admin/qr?table=${t.id}&format=png" alt="QR ${t.number}" />
      <p>${t.capacity} persona · guests · лица</p>
      <p class="langs">Shqip · Македонски · English</p>
    </div>`
      )
      .join("")}
  </div>
  <script>window.onload = () => setTimeout(() => window.print(), 500);</script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
