import { CgDetailsMore } from "react-icons/cg";
import { pkg } from "../../../lib/definitions"
import { fakeCountries } from "../../../lib/fakeData"
import CountryCard from "../../countryCard";

export default function PackageCard({ pkg }: {
    pkg: pkg
}) {

    const getCountryImage = (countryName: string) => {
        const country = fakeCountries.find(country => country.name === countryName);

        if (country) {
            const countryImage = country.image;
            return countryImage
        }
    }

    const images = pkg.countries.map(countryName => getCountryImage(countryName))

    return (
        <div
            className="bg-base-200 flex flex-col break-inside-avoid mb-8"
        >

            {/* <p className="w-full badge badge-neutral text-accent text-xs rounded-md">Package Code <span className="font-medium text-sm text-base-200">&nbsp;&nbsp;0{pkg.id}</span></p> */}

            < div className="border-2 border-base-200">
                {
                    pkg.countries.map((countryName, idx) => <CountryCard
                        key={countryName}
                        image={images[idx]}
                        countryName={countryName}
                        className="rounded-sm border border-base-200"
                        actionBtn={false}
                        hoverEffect={false}
                        height='min'
                    ></CountryCard>
                    )
                }

                <button className="btn btn-accent flex justify-between items-center w-full">
                    <div className="flex items-center gap-2">
                        <div className="text-lg">
                            <CgDetailsMore />
                        </div>
                        <p>View Package</p>
                    </div>
                    <p className="font-normal text-xs">package id<span className="text-sm font-medium">&nbsp;&nbsp;0{pkg.id}</span></p>
                </button>

            </div >
        </div>
    )
}