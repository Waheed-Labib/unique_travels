'use client'

import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { fakePackages } from "../../../lib/fakeData";
import PackageCard from "./packageCard";

export default function ViewMorePackage() {

    const [viewMore, setViewMore] = useState(false);

    const packagesWithoutFeatured = fakePackages.filter(pkg => pkg.isFeatured === false);

    const packagesWithoutFeatureAndFirstThree = packagesWithoutFeatured.slice(3)

    return (
        <div>
            {
                !viewMore && <button onClick={() => setViewMore(true)} className={`btn btn-neutral`}>
                    <p>View More Package</p>
                    <FaArrowDown></FaArrowDown>
                </button>
            }
            {
                viewMore &&
                packagesWithoutFeatured.map((pkg) => <div
                    key={pkg.id}
                    className="block md:hidden"
                >
                    <PackageCard
                        pkg={pkg}
                    ></PackageCard>
                </div>)
            }
            {
                viewMore &&
                packagesWithoutFeatureAndFirstThree.map((pkg) => <div
                    key={pkg.id}
                    className="hidden md:block"
                >
                    <PackageCard
                        pkg={pkg}
                    ></PackageCard>
                </div>)
            }
        </div>
    )
}