import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL("https://restaurantemolinoblanco.com"),
  title: "El Molino Blanco | Artisanal Restaurant & Cuisine in Tenerife",
  description: "Experience exceptional culinary artistry at El Molino Blanco in Costa Adeje, Tenerife, Spain. Enjoy a refined sanctuary serving artisanal dishes, signature breakfasts, and custom menu options.",
  keywords: [
    "restaurant",
    "bistro",
    "El Molino Blanco",
    "Tenerife dining",
    "Costa Adeje restaurant",
    "smørrebrød",
    "gourmet dining",
    "fine cuisine",
    "craft coffee",
    "bar card",
    "Tenerife booking"
  ],
  authors: [{ name: "El Molino Blanco Team" }],
  openGraph: {
    title: "El Molino Blanco | Artisanal Restaurant & Cuisine in Tenerife",
    description: "Experience exceptional culinary artistry at El Molino Blanco in Costa Adeje, Tenerife, Spain. Enjoy a refined sanctuary serving artisanal dishes, signature breakfasts, and custom menu options.",
    url: "https://restaurantemolinoblanco.com",
    siteName: "El Molino Blanco",
    images: [
      {
        url: "/photos/hero1.JPG",
        width: 1200,
        height: 630,
        alt: "El Molino Blanco Fine Dining",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "El Molino Blanco | Artisanal Restaurant & Cuisine in Tenerife",
    description: "Experience exceptional culinary artistry at El Molino Blanco in Costa Adeje, Tenerife, Spain. Enjoy a refined sanctuary serving artisanal dishes, signature breakfasts, and custom menu options.",
    images: ["/photos/hero1.JPG"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#231912",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="paper-grain min-h-screen flex flex-col antialiased selection:bg-stone-800/10">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
