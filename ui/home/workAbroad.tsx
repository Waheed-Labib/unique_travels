import Image from "next/image";
import { fakeRegions } from "../../lib/fakeData";
import Header from "../header";
import { outfit } from "../../app/layout";
import { FaArrowRight } from "react-icons/fa";
import SimpleBtn from "../buttons/simpleBtn";
import * as motion from "motion/react-client"
import Section from "../Section";

export default function WorkAbroad() {
    return (
        <Section>
            <Header
                smallText="Want to"
                largeText="Work Abroad?"
                sequence="small, large"
            ></Header>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    fakeRegions.map(region => <motion.div
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        key={region.id} className="card glass w-full group hover:shadow-lg max-h-64 bg-neutral text-base-200">
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
                                    className="hover:border-base-200"
                                >
                                    <p>Job Circulars</p>
                                    <FaArrowRight></FaArrowRight>
                                </SimpleBtn>
                            </div>
                        </div>
                    </motion.div>)
                }
            </motion.div>
        </Section>
    )
}