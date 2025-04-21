import Image from "next/image";
import { fakeRegions } from "../../lib/fakeData";
import Header from "../header";
import { outfit } from "../../app/layout";
import { FaArrowRight } from "react-icons/fa";
import SimpleBtn from "../buttons/simpleBtn";
import * as motion from "motion/react-client";
import Section from "../Section";
import Link from "next/link";
import GoToHomeBtn from "../buttons/goToHomeBtn";

export default function WorkAbroad({ isMarginShort, isHome = true }: {
    isMarginShort: boolean,
    isHome?: boolean
}) {

    const element = <>
        {
            fakeRegions.map(region =>
                <Link
                    key={region.id}
                    href={`/work-abroad/${region.name}`}
                >
                    <motion.div
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="card glass w-full group hover:shadow-lg max-h-64 bg-neutral text-base-200">
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
                    </motion.div>
                </Link>)
        }
    </>


    return (
        <Section isMarginShort={isMarginShort}>
            <Header
                smallText="Want to"
                largeText="Work Abroad?"
                sequence="small, large"
                isHome={isHome}
            ></Header>

            {
                isHome ?
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 50, damping: 15 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {element}
                    </motion.div>
                    :
                    <div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.6,
                                scale: {
                                    type: "spring",
                                    stiffness: 40,
                                    damping: 12,
                                    bounce: 0.2,
                                },
                                opacity: { duration: 0.4 },
                            }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >

                            {element}
                        </motion.div>

                        <Link href={'/'} className={`w-full text-neutral mt-12 flex items-center justify-center gap-4`}>
                            <GoToHomeBtn></GoToHomeBtn>
                        </Link>
                    </div>

            }

        </Section>
    )
}