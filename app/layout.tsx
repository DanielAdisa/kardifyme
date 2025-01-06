import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";

export const metadata: Metadata = {
  title: "KardifyMe",
  description: "KardifyMe simplifies e-commerce for micro and small-scale vendors, enabling them to create product catalogs and pricing cards that integrate seamlessly with platforms like WhatsApp and Instagram. It's the affordable and hassle-free alternative to Shopify for vendors who need simple, direct customer interaction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
        className={` antialiased`}
      >
        <Header/>
        {children}
        <Footer />
      </body>
     
    </html>
  );
}
