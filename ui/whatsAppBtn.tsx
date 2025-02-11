import Image from "next/image";
import whatsAppLogo from "../public/assets/whatsApp-logo.webp";
import { whatsAppNumber } from "../lib/fakeData";

export default function WhatsAppBtn() {
    return (
        <>
            <a href={`https://wa.me/${whatsAppNumber}`}
                target="_blank"
                className="fixed bottom-8 right-4 z-50"
            >
                <Image
                    src={whatsAppLogo}
                    alt="whatsApp"
                    width={100}
                    height={100}
                    className="w-14 h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 shadow-sm transition-transform duration-300 ease-in-out hover:scale-110"
                ></Image>
            </a>
        </>
    )
}