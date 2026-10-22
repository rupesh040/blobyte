import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { sharedData } from "@/data";
import "./globals.css";

const serifFont = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BLOBYTE — Artful Cooking, Simply Crafted | Food Journal & Recipes",
  description:
    "Explore artisanal recipes that turn everyday cooking into art. Handcrafted recipes, seasonal ingredients, and culinary inspiration.",
  keywords: [
    "recipes",
    "food journal",
    "cooking",
    "culinary",
    "artful cooking",
    "blobyte",
    "gourmet",
    "pasta",
    "soups",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serifFont.variable} ${sansFont.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1917] antialiased selection:bg-[#E8DFD3] selection:text-[#1C1917]">
        <Navbar data={sharedData.navbar} />
        <main className="flex-1">{children}</main>
        <Footer data={sharedData.footer} />
      </body>
    </html>
  );
}


