import { fakeCountries } from "../../lib/fakeData";
import Header from "../header";
import Section from "../Section";
import CountryCard from "../countryCard";
import * as motion from "motion/react-client";

export default function Destinations() {

    const sortedCountries = [...fakeCountries].sort((a, b) => a.name.localeCompare(b.name))

    return (
        <Section>
            <Header
                smallText="Choose Your"
                largeText="Next Destination"
                sequence="small, large"
            ></Header>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    sortedCountries.map(country =>
                        <motion.div
                            key={country.id}
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
                            ></CountryCard>
                        </motion.div>
                    )
                }

            </div>
        </Section>
    )
}