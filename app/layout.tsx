import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "../ui/navbar/navbar";

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

      </body>
    </html >
  );
}
