import Image from "next/image";
import { outfit } from "../app/layout";
import DefaultBtn from "./buttons/defaultBtn";
import { FaArrowRight } from "react-icons/fa";
import { cn } from "../lib/utils";

export default function CountryCard({ image, countryName, className, actionBtn, hoverEffect }: {
    image: string | undefined,
    countryName: string,
    className: string,
    actionBtn: boolean,
    hoverEffect: boolean
}) {
    return (
        <div className={`group card bg-base-100 image-full w-full shadow-xl  transition overflow-hidden max-h-28 ${className}`}>
            <figure>
                {
                    image && <Image
                        src={image}
                        alt="country landscape image"
                        fill={true}
                        className={cn(hoverEffect ? "object-cover transition-transform duration-300 ease-in-out group-hover:scale-110" : "")} />

                }

            </figure>
            <div className="card-body">
                <h2 className={cn(`card-title ${outfit.className}`, hoverEffect ? "underline-offset-4 group-hover:underline transition" : "")}>{countryName}</h2>

                {
                    actionBtn && <div className="card-actions justify-end">
                        <DefaultBtn
                            addOutline={true}
                        >
                            <FaArrowRight></FaArrowRight>
                        </DefaultBtn>
                    </div>
                }

            </div>
        </div>
    )
}