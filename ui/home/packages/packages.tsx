import Link from "next/link";
import { fakePackages } from "../../../lib/fakeData";
import Header from "../../header";
import Section from "../../Section";
import PackageCard from "./packageCard";
import { FaArrowRight } from "react-icons/fa";

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

            <Link href={'/packages'} className={`group hover:underline text-neutral mt-12 flex items-center gap-4`}>
                <p>View More Package</p>
                <div className="rounded-full bg-neutral p-2 text-base-100 group-hover:scale-110 transition-transform">
                    <FaArrowRight></FaArrowRight>
                </div>
            </Link>

        </Section>
    )
}