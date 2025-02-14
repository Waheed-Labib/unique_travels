import { pkg } from "../../../lib/definitions"
import { fakeCountries } from "../../../lib/fakeData"
import PrimaryBtn from "../../buttons/primaryBtn";
import CountryCard from "../../countryCard";
import { FaArrowRight } from "react-icons/fa";

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


            <PrimaryBtn className="text-primary-content flex justify-between items-center w-full">
                <p className="text-xs">View Details</p>
                <div className="text-lg">
                    <FaArrowRight></FaArrowRight>
                </div>
            </PrimaryBtn>
        </div>
    )
}