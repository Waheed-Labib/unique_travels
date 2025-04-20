import Link from "next/link";
import { FaArrowRight, FaHome } from "react-icons/fa";
import * as motion from "motion/react-client"
import { fakePackages } from "../../lib/fakeData";
import Section from "../Section";
import Header from "../header";
import PackageCard from "./packageCard";

export default function Packages({ countryName, isHome, isMarginShort }: {
    countryName?: string,
    isHome?: boolean,
    isMarginShort?: boolean
}) {

    let packages;
    let featuredPackages;
    let firstThreeUnfeaturedPackages;

    if (countryName) {
        packages = fakePackages.filter(pkg => pkg.countries.includes(countryName));
    }

    else {
        packages = fakePackages;
        featuredPackages = fakePackages.filter(pkg => pkg.isFeatured === true)
        firstThreeUnfeaturedPackages = fakePackages.filter(pkg => pkg.isFeatured === false).slice(0, 3);
    }

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
                                isHome ?
                                    <>
                                        {
                                            featuredPackages?.map((pkg) => <PackageCard
                                                key={pkg.id}
                                                pkg={pkg}
                                                className=""
                                                isHome={true}
                                            ></PackageCard>
                                            )
                                        }
                                        {
                                            firstThreeUnfeaturedPackages?.map((pkg) =>
                                                <PackageCard
                                                    key={pkg.id}
                                                    className="hidden md:flex"
                                                    pkg={pkg}
                                                    isHome={true}
                                                ></PackageCard>
                                            )
                                        }
                                    </>
                                    :
                                    <>

                                        {
                                            packages.map((pkg) =>
                                                <PackageCard
                                                    key={pkg.id}
                                                    className=""
                                                    pkg={pkg}
                                                    isHome={false}
                                                ></PackageCard>
                                            )
                                        }
                                    </>
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
                                    <motion.div
                                        whileHover={{ scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-4"
                                    >
                                        <p>Go to Home</p>
                                        <div className="rounded-full bg-neutral p-2 text-base-100 text-xl">
                                            <FaHome></FaHome>
                                        </div>
                                    </motion.div>
                                </Link>
                        }
                    </>
                    :
                    <>
                        {
                            isHome || <Link href={'/'} className={`text-neutral mt-12 flex items-center gap-4`}>
                                <motion.div
                                    whileHover={{ scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-4"
                                >
                                    <p>Go to Home</p>
                                    <div className="rounded-full bg-neutral p-2 text-base-100 text-xl">
                                        <FaHome></FaHome>
                                    </div>
                                </motion.div>
                            </Link>
                        }
                    </>
            }


        </Section >
    )
}