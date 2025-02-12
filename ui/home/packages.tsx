// import Image from "next/image";
import Link from "next/link";
import { fakePackages } from "../../lib/fakeData";
import Header from "../header";
import { FaArrowCircleRight, FaArrowRight } from "react-icons/fa";
import { outfit } from "../../app/layout";
import Section from "./Section";

export default function Packages() {

    // const findCountryImage = (countryName: string): string | undefined => {
    //     const country = fakeCountries.find(country => country.name === countryName);
    //     const countryImage = country?.portraitImage;
    //     return countryImage
    // }

    return (
        <Section>
            <Header
                smallText="We Offer"
                largeText="Suitable Packages"
                underlineColor="accent"
            ></Header>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            </div>

            <Link href={'/packages'} className={`group mt-12 text-neutral hover:underline flex items-center gap-2 ${outfit.className}`}>
                <p>View More Packages</p>
                <div className="text-3xl text-accent group-hover:scale-110 transition">
                    <FaArrowCircleRight></FaArrowCircleRight>
                </div>
            </Link>
        </Section>
    )
}