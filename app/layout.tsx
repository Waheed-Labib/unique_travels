import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../ui/navbar/navbar";
import LeftSideBar from "../ui/sidebars/leftSideBar";
import RightSideBar from "../ui/sidebars/rightSideBar";

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700']
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
        className={`${inter.className} antialiased bg-base-100 relative`}
      >

        <Navbar></Navbar>

        {children}

      </body>
    </html >
  );
}
