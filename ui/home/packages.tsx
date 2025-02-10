// import Image from "next/image";
import { fakePackages } from "../../lib/fakeData";
import Header from "../header";

export default function Packages() {

    // const findCountryImage = (countryName: string): string | undefined => {
    //     const country = fakeCountries.find(country => country.name === countryName);
    //     const countryImage = country?.portraitImage;
    //     return countryImage
    // }

    return (
        <div className="mt-12 lg:mt-24 flex flex-col items-center">
            <Header
                smallText="We Offer"
                largeText="Suitable Packages"
            ></Header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    fakePackages.map(pkg => <div key={pkg.id} className="card bg-base-100 w-96 shadow-xl text-neutral">
                        <div className="badge">Package&nbsp;&nbsp;<span className="text-lg font-semibold">{pkg.id}</span></div>

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

                            <h2 className="card-title text-secondary text-xl">
                                {
                                    pkg.countries.map((country, idx) => <span key={country}>{country}&nbsp;{pkg.countries.length === idx + 1 || '+'}</span>)
                                }
                            </h2>
                            <p>{pkg.details.slice(0, 100)}...</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-sm btn-ghost text-accent">See More</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}