import Header from "../header";
import Section from "../Section";
import * as motion from "motion/react-client";
import Link from "next/link";
import CountryCard from "./countryCard";
import GoToHomeBtn from "../buttons/goToHomeBtn";
import { country } from "../../lib/types";

export default async function Destinations({ isMarginShort, isHome = true }: {
    isMarginShort?: boolean,
    isHome?: boolean
}) {

    const res = await fetch('http://localhost:3000/api/countries');
    const data = await res.json();
    const countries = data.data;

    return (
        <Section isMarginShort={isMarginShort}>
            <Header
                smallText="Choose Your"
                largeText="Next Destination"
                sequence="small, large"
            ></Header>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {
                    countries.map((country: country) =>
                        <motion.div
                            key={country._id}
                            whileHover={{ scale: 1.04, transition: { duration: 0.2, ease: "easeOut" } }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 50, damping: 15 }}
                            viewport={{ once: true }}
                        >
                            <CountryCard
                                countryName={country.name}
                                image={country.image}
                                className="max-h-28"
                                actionBtn={true}
                                hoverEffect={true}
                                isLink={true}
                            ></CountryCard>
                        </motion.div>
                    )
                }

            </div>

            {
                isHome ?
                    <></>
                    :
                    <Link href={'/'} className={`text-neutral mt-12 flex items-center gap-4`}>
                        <GoToHomeBtn></GoToHomeBtn>
                    </Link>
            }
        </Section>
    )
}