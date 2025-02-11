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
                underlineColor="secondary"
            ></Header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    fakeRegions.map(region => <div key={region.id} className="card glass w-full group">
                        <figure>
                            <Image
                                src={region.image}
                                alt="region ladscape image"
                                width={1600}
                                height={800}
                            ></Image>
                        </figure>
                        <div className="card-body">
                            <h2 className={`card-title text-secondary ${outfit.className}`}>{region.name}</h2>
                            <div className="card-actions justify-end">
                                <button className="btn btn-sm btn-ghost text-neutral hover:bg-base-100 border border-base-100 border-dotted group-hover:border-neutral">
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