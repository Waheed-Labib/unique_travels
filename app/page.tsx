import Image from "next/image";
import logo from "../public/assets/logo.jpeg"
import Destinations from "../ui/home/destinations";
import WorkAbroad from "../ui/home/workAbroad";
import ContactUs from "../ui/home/contact/contactUs";
import Subscribe from "../ui/home/subscribe/subscribe";
import Packages from "../ui/packages/packages";

export default function Home() {
  return (
    <div className="">
      <Image
        src={logo}
        alt="logo"
        className="w-full rounded-sm"
      ></Image>

      <Packages
        isHome={true}
      ></Packages>

      <Destinations></Destinations>
      <WorkAbroad></WorkAbroad>
      <Subscribe></Subscribe>
      <ContactUs></ContactUs>
    </div>
  );
}
