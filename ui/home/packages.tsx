// import Image from "next/image";
import Link from "next/link";
import { fakePackages } from "../../lib/fakeData";
import Header from "../header";
import { FaArrowCircleRight } from "react-icons/fa";
import { outfit } from "../../app/layout";

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
                underlineColor="accent"
            ></Header>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-12">
                {
                    fakePackages.slice(0, 6).map(pkg => <div key={pkg.id} className="group card bg-base-100 w-full shadow-xl text-neutral border border-base-100 border-dotted hover:shadow-2xl hover:bg-white cursor-pointer transition">
                        <div className="badge border-accent border-dotted text-sm">Package&nbsp;&nbsp;<span className="font-semibold">{pkg.id}</span></div>

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

                            <div className="border-b border-secondary">
                                <h2 className={`card-title text-secondary text-xl ${outfit.className}`}>
                                    {
                                        pkg.countries.map((country, idx) => <span key={country}>{country}&nbsp;{pkg.countries.length === idx + 1 || '+'}</span>)
                                    }
                                </h2>
                            </div>

                            <p className="text-sm">{pkg.details.slice(0, 100)}...</p>
                            <div className="card-actions justify-end">
                                <button className={`btn btn-sm text-base btn-ghost text-accent ${outfit.className} group-hover:bg-base-100 group-hover:border group-hover:border-accent`}>View Details</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>

            <Link href={'/packages'} className={`mt-12 text-neutral hover:underline flex items-center gap-2 ${outfit.className}`}>
                <p>View More Packages</p>
                <div className="text-3xl text-accent">
                    <FaArrowCircleRight></FaArrowCircleRight>
                </div>
            </Link>
        </div>
    )
}