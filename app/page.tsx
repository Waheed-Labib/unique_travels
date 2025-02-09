import Image from "next/image";
import logo from "../public/assets/logo.jpeg"

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Image src={logo} alt="logo" className="w-full p-12 rounded-sm bg-secondary"></Image>
    </div>
  );
}
