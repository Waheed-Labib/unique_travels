import { CgDetailsMore } from "react-icons/cg";
import { pkg } from "../../../lib/definitions"
import { fakeCountries } from "../../../lib/fakeData"
import CountryCard from "../../countryCard";

export default function PackageCard({ pkg, className }: {
    pkg: pkg,
    className: string
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
        <div className={`w-full h-72 ${className} flex flex-col`}>
            {
                pkg.countries.map((countryName, idx) => <CountryCard
                    key={countryName}
                    image={images[idx]}
                    countryName={countryName}
                    className={`rounded-sm border border-base-200 h-full`}
                    actionBtn={false}
                    hoverEffect={false}
                ></CountryCard>
                )
            }


            <button className="btn btn-accent flex justify-between items-center w-full h-12">
                <div className="flex items-center gap-2">
                    <div className="text-lg">
                        <CgDetailsMore />
                    </div>
                    <p>View Package</p>
                </div>
                <p className="font-normal text-xs">package id<span className="text-sm font-medium">&nbsp;&nbsp;0{pkg.id}</span></p>
            </button>
        </div>
    )
}