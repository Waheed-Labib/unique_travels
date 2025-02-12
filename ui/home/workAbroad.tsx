import Image from "next/image";
import { fakeRegions } from "../../lib/fakeData";
import Header from "../header";
import { FaArrowRight } from "react-icons/fa";
import { outfit } from "../../app/layout";
import Section from "./Section";

export default function WorkAbroad() {
    return (
        <Section>
            <Header
                smallText="Want to"
                largeText="Work Abroad?"
                underlineColor="accent"
            ></Header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    fakeRegions.map(region => <div key={region.id} className="card glass w-full group hover:bg-white hover:shadow-lg">
                        <figure>
                            <Image
                                src={region.image}
                                alt="region ladscape image"
                                width={1600}
                                height={800}
                            ></Image>
                        </figure>
                        <div className="card-body">
                            <h2 className={`card-title text-secondary/95 group-hover:text-secondary ${outfit.className}`}>{region.name}</h2>
                            <div className="card-actions justify-end">
                                <button className="btn btn-xs btn-outline btn-neutral border-dotted group-hover:bg-base-100 group-hover:text-neutral group-hover:border-solid">
                                    <p>Job Circulars</p>
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