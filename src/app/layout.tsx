import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Kafe në Parkun e Çairit, Shkup`,
  description:
    "Kafe, pije dhe ëmbëlsira në natyrë. Menu digjitale, rezervim tavolinash dhe evente deri 40 persona. Hapur 10:00–00:00.",
  icons: { icon: "/logo/logo.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sq">
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
