import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { cn } from "../../lib/utils";
import { outfit } from "../../app/layout";
import SimpleBtn from "../buttons/simpleBtn";
import Link from "next/link";

export default function CountryCard({ image, countryName, className, actionBtn, hoverEffect, isLink = false }: {
    image: string | undefined,
    countryName: string,
    className: string,
    actionBtn: boolean,
    hoverEffect: boolean,
    isLink?: boolean
}) {

    const elements = <>
        <figure>
            {
                image && <Image
                    src={image}
                    alt="country landscape image"
                    fill={true}
                    className={cn("rounded-t-lg", hoverEffect ? "object-cover transition-transform duration-400 ease-in-out group-hover:scale-110" : "")} />

            }

        </figure>
        <div className="card-body">
            <h2 className={cn(`card-title ${outfit.className}`, hoverEffect ? "underline-offset-4 group-hover:underline transition" : "")}>{countryName}</h2>

            {
                actionBtn && <div className="card-actions justify-end">
                    <SimpleBtn
                        addOutline={true}
                    >
                        <FaArrowRight></FaArrowRight>
                    </SimpleBtn>
                </div>
            }

        </div>
    </>

    if (isLink) return (
        <Link
            href={`/destinations/${countryName.toLowerCase()}`}
            className={cn(`group card bg-base-200 image-full w-full shadow-xl  transition overflow-hidden cursor-pointer ${className}`
            )}>
            {elements}
        </Link>
    )

    if (!isLink) return (
        <div
            className={cn(`group card bg-base-200 image-full w-full shadow-xl  transition overflow-hidden cursor-pointer ${className}`
            )}>
            {elements}
        </div>
    )
}