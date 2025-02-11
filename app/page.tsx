import Image from "next/image";
import logo from "../public/assets/logo.jpeg"
import Packages from "../ui/home/packages";
import Destinations from "../ui/home/destinations";
import WorkAbroad from "../ui/home/workAbroad";
import ContactUs from "../ui/home/contactUs";

export default function Home() {
  return (
    <div className="">
      <Image src={logo} alt="logo" className="w-full rounded-sm"></Image>
      <Packages></Packages>
      <Destinations></Destinations>
      <WorkAbroad></WorkAbroad>
      <ContactUs></ContactUs>
    </div>
  );
}
