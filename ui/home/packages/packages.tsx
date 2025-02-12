// import Image from "next/image";
import Link from "next/link";
import { fakePackages } from "../../../lib/fakeData";
import Header from "../../header";
import { FaArrowCircleRight } from "react-icons/fa";
import { outfit } from "../../../app/layout";
import Section from "../Section";
import PackageCard from "./packageCard";
import TestingPackageCard from "./testingPackageCard";

export default function Packages() {

    const featuredPackages = fakePackages.filter(pkg => pkg.isFeatured === true)
    const firstThreeUnfeaturedPackages = fakePackages.filter(pkg => pkg.isFeatured === false).slice(0, 3)

    return (
        <Section>
            <Header
                smallText="We Offer"
                largeText="Suitable Packages"
                sequence="small, large"
            ></Header>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    featuredPackages.map(pkg => <TestingPackageCard
                        key={pkg.id}
                        pkg={pkg}
                    ></TestingPackageCard>)
                }

                {
                    firstThreeUnfeaturedPackages.map(pkg =>
                        <div key={pkg.id} className="w-full hidden md:block">
                            <TestingPackageCard
                                pkg={pkg}>
                            </TestingPackageCard>
                        </div>
                    )
                }
            </div>

            <Link href={'/packages'} className={`group mt-12 text-neutral hover:underline flex items-center gap-2 ${outfit.className}`}>
                <p>View More Packages</p>
                <div className="text-3xl text-accent group-hover:scale-110 transition">
                    <FaArrowCircleRight></FaArrowCircleRight>
                </div>
            </Link>
        </Section>
    )
}