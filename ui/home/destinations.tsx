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
                sequence="small, large"
            ></Header>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    fakeCountries.map(country => <div key={country.id} className="group card bg-base-100 image-full w-full shadow-xl  transition overflow-hidden max-h-28">
                        <figure>
                            <Image
                                src={country.image}
                                alt="country landscape image"
                                fill={true}
                                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110" />
                        </figure>
                        <div className="card-body">
                            <h2 className={`card-title ${outfit.className} underline-offset-4 group-hover:underline transition`}>{country.name}</h2>
                            <div className="card-actions justify-end">
                                <button className="btn btn-xs btn-outline btn-accent group-hover:bg-accent/90 group-hover:text-neutral">
                                    <FaArrowRight></FaArrowRight>
                                </button>
                            </div>
                        </div>
                    </div>)
                }
                {/* {
                    fakeCountries.map(country => <div key={country.id} className="card glass w-full group hover:shadow-lg max-h-64 bg-neutral text-base-200">
                        <figure>
                            <Image
                                src={country.image}
                                alt="country ladscape image"
                                width={1600}
                                height={900}
                            ></Image>
                        </figure>
                        <div className="card-body">
                            <h2 className={`card-title text-2xl ${outfit.className}`}>{country.name}</h2>
                            <div className="card-actions justify-end">
                                <button className="btn btn-xs btn-outline btn-accent">
                                    <FaArrowRight></FaArrowRight>
                                </button>
                            </div>
                        </div>
                    </div>)
                } */}
            </div>
        </Section>
    )
}