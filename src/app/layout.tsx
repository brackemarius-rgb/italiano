import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Italiano – Italienisch lernen",
  description: "Persönliche Lernplattform für Italienisch (Espresso 1).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full">
      <body className="min-h-full">
        {/* Switzer (Fontshare) – einzige Schrift der Marke */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700,800&display=swap"
        />
        {children}
      </body>
    </html>
  );
}
