import Link from "next/link";
import Packages from "../../../ui/packages/packages";
import { fakeCountries } from "../../../lib/fakeData";
import { outfit } from "../../layout";
import Requirements from "./requirements";

type paramsType = Promise<{ countryName: string }>

export default async function Page(props: { params: paramsType }) {

    const { countryName } = await props.params;

    const country = fakeCountries.find(country => country.name.toLowerCase() === countryName);

    return (
        <div className="">
            <div
                className="h-48 p-0 bg-neutral bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${country?.image})` }}
            >
                <div
                    className="breadcrumbs flex flex-col gap-8 justify-center items-center w-full h-full bg-neutral/75 text-slate-50"

                >
                    <p className={`${outfit.className} text-2xl font-semibold`}>{country?.name}</p>
                    <ul className="text-sm py-2 px-4 italic rounded-sm">
                        <li><Link href="/" className="">home</Link></li>
                        <li><Link href="/destinations" className="">destinations</Link></li>
                        <li>{countryName}</li>
                    </ul>
                </div>
            </div>
            <div>
                <Requirements countryName={country?.name} requirements={country?.visaRequirements}></Requirements>
            </div>
            <div>
                <Packages countryName={country?.name} isMarginShort={true} isHome={false}></Packages>
            </div>
        </div >
    )
}

