
import { FaArrowRight } from "react-icons/fa";
import * as motion from "motion/react-client"
import { fakeCountries } from "../../lib/fakeData";
import { pkg } from "../../lib/definitions";
import CountryCard from "../countryCard";
import PrimaryBtn from "../buttons/primaryBtn";

export default function PackageCard({ pkg, className, isHome }: {
    pkg: pkg,
    className: string,
    isHome: boolean
}) {

    // temporary
    const getCountryImage = (countryName: string) => {
        const country = fakeCountries.find(country => country.name === countryName);

        if (country) {
            const countryImage = country.image;
            return countryImage
        }
    }

    const images = pkg.countries.map(countryName => getCountryImage(countryName))

    const elements = <>
        <button className="btn hover:bg-transparent hover:border-transparent btn-sm">
            Package id <div className="badge badge-sm badge-primary text-white">00{pkg.id}</div>
        </button>
        {
            pkg.countries.map((countryName, idx) => <CountryCard
                key={countryName}
                image={images[idx]}
                countryName={countryName}
                className={`rounded-sm border-b border-base-200 h-full`}
                actionBtn={false}
                hoverEffect={false}
            ></CountryCard>
            )
        }


        <PrimaryBtn className="text-primary-content flex justify-between items-center w-full">
            <p className="text-xs">View Details</p>
            <div className="text-lg">
                <FaArrowRight></FaArrowRight>
            </div>
        </PrimaryBtn>
    </>

    if (isHome) return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } }}
            whileTap={{ scale: 0.96 }}
            className={`w-full h-72 rounded-xl ${className} flex flex-col`}>
            {elements}
        </motion.div>
    )

    if (!isHome) return (
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
            className={`w-full h-72 rounded-xl ${className} flex flex-col`}>
            {elements}
        </motion.div>
    )
}