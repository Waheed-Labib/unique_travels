import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import * as motion from "motion/react-client";
import Section from "../Section";
import Header from "../header";
import PackageCard from "./packageCard";
import GoToHomeBtn from "../buttons/goToHomeBtn";
import { pkg } from "../../lib/types";

export default async function Packages({ countryName, isHome, isMarginShort }: {
    countryName?: string,
    isHome?: boolean,
    isMarginShort?: boolean
}) {

    let packages;
    let featuredPackages;
    let firstThreeUnfeaturedPackages;

    if (countryName) {
        // get specific country package
        const res = await fetch(`http://localhost:3000/api/packages?country=${countryName}`);
        const data = await res.json();
        packages = data.data;
    }

    else {
        if (isHome) {
            // get featured packages
            const featuredResponse = await fetch('http://localhost:3000/api/packages?type=featured');
            const featuredData = await featuredResponse.json();
            featuredPackages = featuredData.data;

            // get first three unfeatured packages
            const unfeaturedResponse = await fetch('http://localhost:3000/api/packages?type=unfeatured&limit=3');
            const unfeaturedData = await unfeaturedResponse.json();
            firstThreeUnfeaturedPackages = unfeaturedData.data;

            packages = [...featuredPackages, ...firstThreeUnfeaturedPackages];

        } else {
            //get all package
            const res = await fetch(`http://localhost:3000/api/packages`);
            const data = await res.json();
            packages = data.data;
        }

    }

    // console.log('packages', packages)

    return (
        <Section isMarginShort={isMarginShort}>
            {
                packages.length ?
                    <>
                        {
                            countryName ?
                                <Header
                                    largeText="Available Package"
                                    smallText={`for ${countryName}`}
                                    sequence="large, small"
                                    isHome={isHome}
                                ></Header>
                                :
                                <Header
                                    largeText="Suitable Package"
                                    smallText="for You"
                                    sequence="large, small"
                                    isHome={isHome}
                                ></Header>
                        }

                        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                            {
                                packages.map((pkg: pkg) =>
                                    <PackageCard
                                        key={pkg._id}
                                        className=""
                                        pkg={pkg}
                                        isHome={false}
                                    ></PackageCard>
                                )
                            }

                        </div>

                        {
                            isHome ?
                                <Link href={'/packages'} className={`text-neutral mt-12 flex items-center gap-4`}>
                                    <motion.div
                                        whileHover={{ scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-4"
                                    >
                                        <p>View More Package</p>
                                        <div className="rounded-full bg-neutral p-2 text-base-100">
                                            <FaArrowRight></FaArrowRight>
                                        </div>
                                    </motion.div>
                                </Link>
                                :
                                <Link href={'/'} className={`text-neutral mt-12 flex items-center gap-4`}>
                                    <GoToHomeBtn></GoToHomeBtn>
                                </Link>
                        }
                    </>
                    :
                    <>
                        {
                            isHome || <Link href={'/'} className={`text-neutral mt-12 flex items-center gap-4`}>
                                <GoToHomeBtn></GoToHomeBtn>
                            </Link>
                        }
                    </>
            }


        </Section >
    )
}