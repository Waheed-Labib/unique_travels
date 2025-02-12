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

    return (<div className="group card w-full shadow-xl text-neutral border border-base-100 border-dotted hover:shadow-2xlcursor-pointer transition glass bg-neutral/95 hover:bg-neutral">
        <div className="badge border-neutral/90 border-dotted text-sm">Package Code&nbsp;&nbsp;<span className="font-semibold">{pkg.id}</span></div>

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

            <div className="border-b pb-2 border-base-200 border-dotted group-hover:border-solid">
                <h2 className={`card-title text-base-200 group-hover:text-base-100 text-2xl ${outfit.className} flex-wrap gap-0`}>
                    {
                        pkg.countries.map((country, idx) => <span key={country}>{country}&nbsp;{pkg.countries.length === idx + 1 || '+'}&nbsp;</span>)
                    }
                </h2>
            </div>

            <p className="text-xs text-base-200">{pkg.details.slice(0, 100)}...</p>
            <div className="card-actions justify-end">
                <button className={`btn btn-xs btn-ghost text-accent/90 group-hover:bg-neutral/90 border-dotted group-hover:border-solid`}>
                    <p>See More</p>
                    <FaArrowRight></FaArrowRight>
                </button>
            </div>
        </div>
    </div>)
}