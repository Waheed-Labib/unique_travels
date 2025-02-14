import Image from "next/image";
import circleLogo from "../app/favicon.ico";
import { outfit } from "../app/layout";
import { BsFillTelephoneFill } from "react-icons/bs";
import CopyBtn from "./buttons/copyBtn";

export default function Footer() {

    return (
        <>
            <footer className="mt-24 footer footer-center glass bg-primary text-primary-content p-10">
                <aside>
                    <Image
                        src={circleLogo}
                        alt="logo"
                        width={100}
                        height={100}
                        className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
                    ></Image>
                    <div className="">
                        <p className={`font-bold text-2xl ${outfit.className}`}>Unique Travels</p>
                        <p className="font-semibold">Time for an Adventure</p>
                    </div>

                    <p className="text-sm">Copyright © {new Date().getFullYear()} - All rights reserved</p>
                </aside>

                <nav>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-1 text-neutral">
                        <p>Website designed and developed by</p>
                        <a href="https://www.linkedin.com/in/waheed-labib-45b1b625a/" className="underline underline-offset-2">Waheed Labib</a>
                    </div>

                    <div className="flex items-center gap-1 cursor-pointer">
                        <BsFillTelephoneFill></BsFillTelephoneFill>
                        <p>01766404828</p>
                        <CopyBtn
                            copyText='01766404828'
                        ></CopyBtn>
                    </div>

                </nav>
            </footer>
        </>
    )
}