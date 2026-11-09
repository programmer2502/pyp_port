import type { Metadata } from "next";
import "./globals.css";
import { LayoutWrapper } from "@/components/brivon/LayoutWrapper";

export const metadata: Metadata = {
  title: "PYP Studio — Commercial & Editorial Photography",
  description:
    "Commercial photographers, editorial studios, and documentary teams — charcoal ground, electric lime accent, Boldonse display, five fully responsive pages.",
  keywords:
    "photography, editorial studio, commercial photography, PYP, Brooklyn, Berlin",
  icons: {
    icon: "/assets/img/pyp-icon.png",
    apple: "/assets/img/pyp-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Boldonse&family=Inter+Tight:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap"
        />
        <link rel="stylesheet" href="/assets/css/styles.css" />
      </head>
      <body suppressHydrationWarning>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
