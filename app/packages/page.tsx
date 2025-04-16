import Link from "next/link";
import Packages from "../../ui/packages";

export default function Page() {
    return (
        <div className="">
            <div
                className="h-24 p-0 bg-neutral"
            >
                <div className="breadcrumbs flex justify-center items-center w-full h-full bg-gradient-to-tr from-neutral to-neutral/25">
                    <ul className="text-sm bg-neutral text-slate-50 py-2 px-4 italic rounded-sm">
                        <li><Link href="/" className="">home</Link></li>
                        <li className="">packages</li>
                    </ul>
                </div>
            </div>
            <div>
                <Packages isMarginShort={true}></Packages>
            </div>
        </div >
    )
}
