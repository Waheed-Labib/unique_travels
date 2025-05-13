import Link from "next/link";
import { fakeRegions } from "../../../lib/fakeData";
import { outfit } from "../../layout";
import Circulars from "./circulars";

export default async function Page({
    params,
}: {
    params: Promise<{ regionName: string }>;
}) {

    const { regionName } = await params;
    const region = fakeRegions.find(region => region.name === regionName);

    const res = await fetch(`http://localhost:3000/api/circulars?region=${regionName}`);
    const data = await res.json();
    const circulars = data.data;

    return (
        <div className="">
            <div
                className="h-48 p-0 bg-neutral bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${region?.image})` }}
            >
                <div
                    className="breadcrumbs flex flex-col gap-8 justify-center items-center w-full h-full bg-neutral/75 text-slate-50"

                >
                    <p className={`${outfit.className} text-2xl font-semibold`}>{region?.name}</p>
                    <ul className="text-sm py-2 px-4 italic rounded-sm">
                        <li><Link href="/" className="">home</Link></li>
                        <li><Link href="/work-abroad" className="">work-abroad</Link></li>
                        <li>{regionName}</li>
                    </ul>
                </div>
            </div>

            <Circulars regionName={regionName} circulars={circulars}></Circulars>
        </div >
    )
}
