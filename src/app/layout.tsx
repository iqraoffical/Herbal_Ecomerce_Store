import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/context/CartContext";
import WhatsAppButton from "./components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HerbalHairOil - Pure Natural Hair Care Products",
  description: "Experience the power of ancient Ayurvedic herbs for healthier, stronger, and more beautiful hair. 100% natural herbal hair oil.",
  keywords: ["herbal hair oil", "natural hair care", "ayurvedic", "hair growth", "pure herbs"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          {children}
          <WhatsAppButton />
          <Toaster position="top-right" richColors />
        </CartProvider>
      </body>
    </html>
  );
}
