import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "../ui/navbar/navbar";
import whatsAppLogo from "../public/assets/whatsApp-logo.webp"
import Image from "next/image";

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700']
})

export const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400']
})

export const metadata: Metadata = {
  title: "Unique Travels",
  description: "Bangladeshi Travel Agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-base-100 relative max-w-screen-2xl mx-auto mb-24`}
      >

        <Navbar></Navbar>

        {children}

        <a href="https://wa.me/8801788458189"
          target="_blank"
          className="fixed bottom-8 right-4 z-50"
        >
          <Image
            src={whatsAppLogo}
            alt="whatsApp"
            width={100}
            height={100}
            className="w-14 h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 shadow-sm transition-transform duration-300 ease-in-out hover:scale-110"
          ></Image>
        </a>
      </body>
    </html >
  );
}
