import Link from "next/link";
import Packages from "../../ui/packages";

export default function Page() {

    return (
        <div className="">
            <div
                className="bg-cover bg-center h-48 p-0"
                style={{ backgroundImage: "url('/assets/breadcrumbsBG.png')" }}
            >
                <div className="breadcrumbs flex justify-center items-center w-full h-full bg-gradient-to-tr from-neutral/25 to-neutral">
                    <ul className="text-sm bg-neutral text-slate-50 py-2 px-4 shadow-sm shadow-slate-50">
                        <li><Link href="/" className="">Home</Link></li>
                        <li className="">Packages</li>
                    </ul>
                </div>
            </div>
            <div>
                <Packages></Packages>
            </div>
        </div >
    )
}