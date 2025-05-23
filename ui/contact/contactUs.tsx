import { BsFillTelephoneFill } from "react-icons/bs";
import Header from "../header";
import Section from "../Section";
import { FaLocationDot } from "react-icons/fa6";
import * as motion from "motion/react-client"

export default async function ContactUs() {

    const res = await fetch('http://localhost:3000/api/contacts');
    const data = await res.json();
    const { hotline, address } = data.data;

    return (
        <div id='contact-us'>
            <Section>
                <Header
                    smallText=""
                    largeText="Contact Us"
                    sequence="small, large"
                ></Header>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 50, damping: 15 }}
                    viewport={{ once: true }}
                    className="card glass bg-neutral text-base-100 w-full py-4"
                >
                    <div className="card-body w-full">
                        <div className="w-full flex justify-center items-center gap-4 md:gap-8 py-8 flex-col md:flex-row text-center">
                            <div className="flex items-center gap-2 text-primary">
                                <div className="text-2xl text-accent">
                                    <BsFillTelephoneFill></BsFillTelephoneFill>
                                </div>
                                <p className="text-lg text-base-200">Hotline :</p>
                            </div>

                            <div className="flex items-center gap-2 md:gap-8 flex-col md:flex-row">
                                <p className="text-lg text-base-200">{hotline}</p>
                                {/* <CopyNumberBtn></CopyNumberBtn> */}
                                <a href={`tel:${hotline}`}>
                                    <button className={`btn btn-sm btn-primary`}>Call Now</button>
                                </a>
                            </div>

                        </div>

                        <hr className="border-base-200" />

                        <div className="w-full flex justify-center items-center gap-4 md:gap-8 py-8 flex-col md:flex-row text-center">
                            <div className="flex items-center gap-2 md:gap-4 text-primary">
                                <div className="text-2xl text-accent">
                                    <FaLocationDot />
                                </div>
                                <p className="text-lg text-base-200">Address :</p>
                            </div>

                            <div>
                                <p className="text-base-200">{address}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Section >
        </div>

    )
}