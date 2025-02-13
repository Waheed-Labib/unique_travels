import Image from "next/image";
import logo from "../public/assets/logo.jpeg"
import Packages from "../ui/home/packages/packages";
import Destinations from "../ui/home/destinations";
import WorkAbroad from "../ui/home/workAbroad";
import ContactUs from "../ui/home/contact/contactUs";
import Subscribe from "../ui/home/subscribe/subscribe";

export default function Home() {
  return (
    <div className="">
      <Image src={logo} alt="logo" className="w-full rounded-sm"></Image>
      <Packages></Packages>
      <Destinations></Destinations>
      <WorkAbroad></WorkAbroad>
      <Subscribe></Subscribe>
      <ContactUs></ContactUs>
    </div>
  );
}
