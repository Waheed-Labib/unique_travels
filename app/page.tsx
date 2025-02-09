import Image from "next/image";
import logo from "../public/assets/logo.jpeg"
import Packages from "../ui/home/packages";

export default function Home() {
  return (
    <div className="">
      <Image src={logo} alt="logo" className="w-full rounded-sm"></Image>
      <Packages></Packages>
    </div>
  );
}
