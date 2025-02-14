import Link from "next/link";
import { fakePackages } from "../../../lib/fakeData";
import Header from "../../header";
import Section from "../../Section";
import PackageCard from "./packageCard";
import { FaArrowRight } from "react-icons/fa";
import * as motion from "motion/react-client"

export default function Packages() {

    const featuredPackages = fakePackages.filter(pkg => pkg.isFeatured === true)
    const firstThreeUnfeaturedPackages = fakePackages.filter(pkg => pkg.isFeatured === false).slice(0, 3)

    return (
        <Section>
            <Header
                largeText="Suitable Package"
                smallText="for You"
                sequence="large, small"
            ></Header>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    featuredPackages.map((pkg) => <PackageCard
                        key={pkg.id}
                        pkg={pkg}
                        className=""
                    ></PackageCard>
                    )
                }
                {
                    firstThreeUnfeaturedPackages.map((pkg) =>
                        <PackageCard
                            key={pkg.id}
                            className="hidden md:flex"
                            pkg={pkg}
                        ></PackageCard>
                    )
                }
            </div>

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

        </Section >
    )
}