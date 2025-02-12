import Image from "next/image";
import { fakeCountries } from "../../lib/fakeData";
import Header from "../header";
import { FaArrowRight } from "react-icons/fa";
import { outfit } from "../../app/layout";
import Section from "./Section";

export default function Destinations() {
    return (
        <Section>
            <Header
                smallText="Choose Your"
                largeText="Destination"
                underlineColor="accent"
            ></Header>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    fakeCountries.map(country => <div key={country.id} className="group card bg-base-100 image-full w-full shadow-xl  transition overflow-hidden h-48">
                        <figure>
                            <Image
                                src={country.landscapeImage}
                                alt="country landscape image"
                                fill={true}
                                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110" />
                        </figure>
                        <div className="card-body">
                            <h2 className={`card-title ${outfit.className} underline-offset-4 group-hover:underline transition`}>{country.name}</h2>
                            <div className="card-actions justify-end mt-12">
                                <button className="btn btn-sm btn-outline btn-accent group-hover:bg-accent group-hover:text-neutral group-hover:scale-110">
                                    <FaArrowRight></FaArrowRight>
                                </button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </Section>
    )
}