import Image from "next/image";
import { fakeCountries } from "../../lib/fakeData";
import Header from "../header";
import { FaArrowCircleRight } from "react-icons/fa";
import { outfit } from "../../app/layout";

export default function Destinations() {
    return (
        <div className="mt-12 lg:mt-24 flex flex-col items-center">
            <Header
                smallText="Choose Your"
                largeText="Destination"
                underlineColor="secondary"
            ></Header>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-12">
                {
                    fakeCountries.map(country => <div key={country.id} className="group card bg-base-100 image-full w-full shadow-xl  transition overflow-hidden">
                        <figure>
                            <Image
                                src={country.landscapeImage}
                                alt="country landscape image"
                                fill={true}
                                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110" />
                        </figure>
                        <div className="card-body">
                            <h2 className={`card-title ${outfit.className} underline-offset-4 group-hover:underline transition`}>{country.name}</h2>
                            <div className="card-actions justify-end">
                                <button className="btn btn-sm btn-primary">
                                    <FaArrowCircleRight></FaArrowCircleRight>
                                </button>
                            </div>
                        </div>
                    </div>)
                }
            </div>

        </div>
    )
}