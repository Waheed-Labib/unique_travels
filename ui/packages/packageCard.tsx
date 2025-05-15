'use client'

import { FaArrowRight } from "react-icons/fa";
import * as motion from "motion/react-client";
import { country, pkg } from "../../lib/types";
import PrimaryBtn from "../buttons/primaryBtn";
import { useEffect, useState } from "react";
import PackageModal from "./packageModal";
import CountryCard from "../destinations/countryCard";

export default function PackageCard({ pkg, className, isHome }: {
    pkg: pkg,
    className: string,
    isHome: boolean
}) {

    const countriesInString = pkg.countries.join(',');

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const getCountriesFromDB = async () => {
            const res = await fetch(`http://localhost:3000/api/countries?countries=${countriesInString}`);
            const data = await res.json();
            setCountries(data.data);
        }

        getCountriesFromDB();
    }, [countriesInString])


    const elements = <>
        {
            countries.length ?
                <>
                    <button className="btn hover:bg-transparent hover:border-transparent btn-sm">
                        Package id <div className="badge badge-sm badge-primary text-white">00{pkg.code}</div>
                    </button>
                    {
                        countries.map((country: country) => <CountryCard
                            key={country._id}
                            image={country.image}
                            countryName={country.name}
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
                :
                <div className="flex w-full flex-col items-center gap-4">
                    <div className="skeleton h-8 w-28"></div>
                    <div className="skeleton h-48 w-full"></div>
                    <div className="skeleton h-12 w-full"></div>
                </div>
        }
    </>

    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    return (
        <>
            {
                isHome ?
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 50, damping: 15 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setIsDetailsModalOpen(true)}
                        className={`w-full h-72 rounded-xl ${className} flex flex-col`}>
                        {elements}
                    </motion.div>
                    :
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
                        whileHover={{ scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setIsDetailsModalOpen(true)}
                        className={`w-full h-72 rounded-xl ${className} flex flex-col`}>
                        {elements}
                    </motion.div>
            }
            {
                isDetailsModalOpen && <PackageModal
                    isOpen={isDetailsModalOpen}
                    setIsOpen={setIsDetailsModalOpen}
                    pkg={pkg}
                ></PackageModal>
            }

        </>
    )
}