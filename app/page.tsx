import Image from "next/image";
import logo from "../public/assets/logo.png"
import Packages from "../ui/packages/packages";
import Destinations from "../ui/destinations/destinations";
import WorkAbroad from "../ui/work-abroad/workAbroad";

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
      <WorkAbroad isMarginShort={false} isHome={true}></WorkAbroad>
    </div>
  );
}
