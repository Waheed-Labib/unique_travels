import { pkg } from "../../../lib/definitions"
import { fakeCountries } from "../../../lib/fakeData"
import CountryCard from "../../countryCard";
import { FaArrowRight } from "react-icons/fa";

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
        <div className="bg-accent flex flex-col justify-end">
            <div className="border-2 border-accent ">
                {
                    pkg.countries.map((countryName, idx) => <CountryCard
                        key={countryName}
                        image={images[idx]}
                        countryName={countryName}
                        className="rounded-sm border border-accent"
                        actionBtn={false}
                        hoverEffect={false}
                        height='min'
                    ></CountryCard>
                    )
                }
                <button className="w-full btn btn-accent rounded-sm">
                    <p>Package Code 0{pkg.id}</p>
                    <div className="rounded-full bg-neutral text-base-200 p-2 ml-2">
                        <FaArrowRight></FaArrowRight>
                    </div>
                </button>
            </div >
        </div>
    )
}