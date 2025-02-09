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
        className={`${inter.className} antialiased bg-base-100`}
      >

        <Navbar></Navbar>

        <div className="flex">
          <div className="w-1/5 hidden lg:block">
            <LeftSideBar></LeftSideBar>
          </div>

          <div className="w-full lg:w-3/5">
            {children}
          </div>

          <div className="w-1/5 hidden lg:block">
            <RightSideBar></RightSideBar>
          </div>

        </div>

      </body>
    </html>
  );
}
