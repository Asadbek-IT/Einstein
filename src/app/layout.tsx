import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const ibmMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Альберт Эйнштейн — Наследие Разума",
  description:
    "Исследуйте жизнь и научное наследие Альберта Эйнштейна — нобелевского лауреата 1921 года, автора теории относительности.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${playfair.variable} ${dmSans.variable} ${ibmMono.variable}`}>
      <body className="bg-cream text-ink antialiased">{children}</body>
    </html>
  );
}
