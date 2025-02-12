import { FaArrowRight } from "react-icons/fa"
import { outfit } from "../../../app/layout"
import { pkg } from "../../../lib/definitions"

export default function PackageCard({ pkg }: {
    pkg: pkg
}) {
    // const findCountryImage = (countryName: string): string | undefined => {
    //     const country = fakeCountries.find(country => country.name === countryName);
    //     const countryImage = country?.portraitImage;
    //     return countryImage
    // }

    return (<div className="group card bg-base-100 w-full shadow-xl text-neutral border border-base-100 border-dotted hover:shadow-2xl hover:bg-white cursor-pointer transition">
        <div className="badge border-accent border-dotted text-sm">Package Code&nbsp;&nbsp;<span className="font-semibold">{pkg.id}</span></div>

        {/* <div className="w-full flex justify-center mt-4">
            {
                pkg.countries.map(country => {
                    const countryImg = findCountryImage(country);
                    if (countryImg) return <Image
                        key={country}
                        src={fakeCountries[0].portraitImage}
                        alt=''
                        width={360 / pkg.countries.length}
                        height={120}
                        className="border border-base-100"></Image>
                })
            }
        </div> */}

        <div className="card-body">

            <div className="border-b border-secondary border-dotted group-hover:border-solid">
                <h2 className={`card-title text-secondary/95 group-hover:text-secondary text-xl ${outfit.className} flex-wrap gap-0`}>
                    {
                        pkg.countries.map((country, idx) => <span key={country}>{country}&nbsp;{pkg.countries.length === idx + 1 || '+'}&nbsp;</span>)
                    }
                </h2>
            </div>

            <p className="text-sm text-neutral/90">{pkg.details.slice(0, 100)}...</p>
            <div className="card-actions justify-end">
                <button className={`btn btn-xs btn-ghost text-neutral/90 group-hover:bg-base-100 border-dotted group-hover:border group-hover:border-neutral`}>
                    <p>See More</p>
                    <FaArrowRight></FaArrowRight>
                </button>
            </div>
        </div>
    </div>)
}