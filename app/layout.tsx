import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "../ui/navbar/navbar";
import WhatsAppBtn from "../ui/whatsAppBtn";
import Footer from "../ui/footer";
import Subscribe from "../ui/subscribe/subscribe";
import ContactUs from "../ui/contact/contactUs";

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700']
})

export const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400']
})

// export const metadata: Metadata = {
//   title: "Unique Travels",
//   description: "Bangladeshi Travel Agency",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-base-200 relative max-w-screen-2xl mx-auto`}
      >
        <WhatsAppBtn></WhatsAppBtn>
        <Navbar></Navbar>
        {children}
        <Subscribe></Subscribe>
        <ContactUs></ContactUs>
        <Footer></Footer>
      </body>
    </html >
  );
}
