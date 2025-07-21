import Header from "../header";
import * as motion from "motion/react-client";
import Section from "../Section";
import Link from "next/link";
import GoToHomeBtn from "../buttons/goToHomeBtn";
import { Region } from "../../lib/types";
import RegionCard from "./regionCard";

export default async function WorkAbroad({ isMarginShort, isHome = true }: {
    isMarginShort: boolean,
    isHome?: boolean
}) {

    // fetch region data
    const regionResponse = await fetch(`http://localhost:3000/api/regions`);
    const regionData = await regionResponse.json();
    const regions = regionData.data;

    const element = <>
        {
            regions.map((region: Region) => (
                <RegionCard
                    key={region._id}
                    region={region}
                />
            ))
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