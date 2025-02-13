import { fakePackages } from "../../../lib/fakeData";
import Header from "../../header";
import Section from "../Section";
import PackageCard from "./packageCard";
import ViewMorePackage from "./viewMorePackage";

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

            <div className="w-full columns-1 sm:columns-2 lg:columns-3 gap-8">
                {
                    featuredPackages.map((pkg) => <PackageCard
                        key={pkg.id}
                        pkg={pkg}
                    ></PackageCard>)
                }
                {
                    firstThreeUnfeaturedPackages.map((pkg) => <div
                        key={pkg.id}
                        className="hidden md:block"
                    >
                        <PackageCard
                            pkg={pkg}
                        ></PackageCard>
                    </div>)
                }
                <ViewMorePackage></ViewMorePackage>
            </div>

        </Section>
    )
}