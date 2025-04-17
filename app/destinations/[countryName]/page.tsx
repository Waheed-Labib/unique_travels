import Link from "next/link";
import Packages from "../../../ui/packages/packages";
import { fakeCountries } from "../../../lib/fakeData";
import { outfit } from "../../layout";

type Params = {
    countryName: string;
};

export default function Page({ params }: {
    params: Params
}) {

    const countryName = params.countryName;

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
                    <p className={`${outfit.className} text-xl font-semibold`}>{country?.name}</p>
                    <ul className="text-sm py-2 px-4 italic rounded-sm">
                        <li><Link href="/" className="">home</Link></li>
                        <li><Link href="/destinations" className="">destinations</Link></li>
                        <li>{countryName}</li>
                    </ul>
                </div>
            </div>
            <div>
                <Packages isMarginShort={true} isHome={false}></Packages>
            </div>
        </div >
    )
}
