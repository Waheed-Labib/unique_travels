import Link from "next/link";
import Packages from "../../ui/packages";

export default function Page() {

    return (
        <div className="">
            <div
                className="breadcrumbs text-neutral bg-cover bg-center h-48 p-0"
                style={{ backgroundImage: "url('/assets/breadcrumbsBG.png')" }}
            >
                <ul className="bg-gradient-to-r from-slate-50/50 via-slate-50 to-slate-50/50 w-full h-full justify-center p-8">
                    <li><Link href="/" className="">Home</Link></li>
                    <li className="">Packages</li>
                </ul>
            </div>

            <div>
                <Packages></Packages>
            </div>
        </div >
    )
}