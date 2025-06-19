import { BsFillTelephoneFill } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import Header from "../header";
import Section from "../Section";
import { FaLocationDot } from "react-icons/fa6";
import * as motion from "motion/react-client"

export default async function ContactUs() {

    const res = await fetch('http://localhost:3000/api/contacts');
    const data = await res.json();
    const { email, hotline, address } = data.data;

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
                    className="card glass bg-neutral text-base-100 w-full py-2"
                >
                    <div className="card-body w-full">
                        {/* Small devices: Stacked layout */}
                        <div className="flex flex-col gap-6 md:hidden text-center items-center">
                            <div className="flex flex-col items-center gap-2 text-primary">
                                <BsFillTelephoneFill className="text-2xl text-accent" />
                                <p className="text-lg text-base-200">Hotline</p>
                                <p className="text-base-200">{hotline}</p>
                                <a href={`tel:${hotline}`}>
                                    <button className="btn btn-sm btn-primary">Call Now</button>
                                </a>
                            </div>

                            <div className="flex flex-col items-center gap-2 text-primary">
                                <MdOutlineEmail className="text-xl text-accent" />
                                <p className="text-sm text-base-200">Email</p>
                                <p className="text-base-200">{email}</p>
                            </div>

                            <div className="flex flex-col items-center gap-2 text-primary">
                                <FaLocationDot className="text-xl text-accent" />
                                <p className="text-sm text-base-200">Address</p>
                                <p className="text-base-200">{address}</p>
                            </div>
                        </div>

                        {/* Medium and larger devices: Table layout */}
                        <div className="hidden md:flex justify-center">
                            <table className="table w-full max-w-3xl text-left">
                                <tbody className="text-base-200">

                                    {/* Hotline Row */}
                                    <tr className="border-b border-base-300">
                                        <td className="py-4 w-1/3">
                                            <div className="flex items-center gap-2 text-primary">
                                                <BsFillTelephoneFill className="text-xl text-base-200" />
                                                <span className="text-base font-medium">Hotline</span>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <div className="flex items-center gap-4 flex-wrap">
                                                <p className="text-base-100">{hotline}</p>
                                                <a href={`tel:${hotline}`}>
                                                    <button className="btn btn-sm btn-primary">Call Now</button>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Email Row */}
                                    <tr className="border-b border-base-300">
                                        <td className="py-4">
                                            <div className="flex items-center gap-2 text-primary">
                                                <MdOutlineEmail className="text-lg text-base-200" />
                                                <span className="text-base font-medium">Email</span>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <p>{email}</p>
                                        </td>
                                    </tr>

                                    {/* Address Row */}
                                    <tr>
                                        <td className="py-4">
                                            <div className="flex items-center gap-2 text-primary">
                                                <FaLocationDot className="text-lg text-base-200" />
                                                <span className="text-base font-medium">Address</span>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <p>{address}</p>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.div>
            </Section >
        </div>

    )
}