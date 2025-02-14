import Image from "next/image";
import { fakeRegions } from "../../lib/fakeData";
import Header from "../header";
import { outfit } from "../../app/layout";
import Section from "../Section";
import { FaArrowRight } from "react-icons/fa";
import SimpleBtn from "../buttons/simpleBtn";

export default function WorkAbroad() {
    return (
        <Section>
            <Header
                smallText="Want to"
                largeText="Work Abroad?"
                sequence="small, large"
            ></Header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    fakeRegions.map(region => <div key={region.id} className="card glass w-full group hover:shadow-lg max-h-64 bg-neutral text-base-200">
                        <figure>
                            <Image
                                src={region.image}
                                alt="region ladscape image"
                                width={1600}
                                height={900}
                            ></Image>
                        </figure>
                        <div className="card-body">
                            <h2 className={`card-title text-2xl ${outfit.className} text-base-100`}>{region.name}</h2>
                            <div className="card-actions justify-end">
                                <SimpleBtn
                                    addOutline={true}
                                >
                                    <p>Job Circulars</p>
                                    <FaArrowRight></FaArrowRight>
                                </SimpleBtn>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </Section>
    )
}