import Image from "next/image";
import { pkg } from "../../../lib/definitions"
import { fakeCountries } from "../../../lib/fakeData"
import { outfit } from "../../../app/layout";
import CountryCard from "../../countryCard";

export default function TestingPackageCard({ pkg }: {
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
        <div>
            {
                pkg.countries.map((countryName, idx) => <CountryCard
                    key={countryName}
                    image={images[idx]}
                    countryName={countryName}
                    className="rounded-sm border border-base-200"
                    actionBtn={false}
                    hoverEffect={false}
                ></CountryCard>
                )
            }
        </div >
    )
}