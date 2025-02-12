import Link from "next/link";
import circleLogo from '../../app/favicon.ico'
import Image from "next/image";
import { fakeCountries } from "../../lib/fakeData";
import { outfit } from "../../app/layout";

const packagesLink = <Link href={'/packages'}>
    Packages
</Link>

const countriesLinks = <ul className="p-2">
    {
        fakeCountries.map(country => <li key={country.name}><Link href={country.href}>{country.name}</Link></li>)
    }
</ul>

const workAbroadLink = <Link href={'/work-abroad'}>Work Abroad</Link>

export default function Navbar() {

    return (
        <div className="navbar py-0 min-h-12 bg-base-100/95 text-neutral shadow-lg sticky top-0 left-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            {packagesLink}
                        </li>
                        <li>
                            <Link href={'/destinations'}>Destinations</Link>
                            {countriesLinks}
                        </li>
                        <li>
                            {workAbroadLink}
                        </li>
                    </ul>
                </div>
                <Link href={'/'} className="btn btn-ghost">
                    <Image src={circleLogo} alt='logo' className="w-6 h-6 lg:w-8 lg:h-8"></Image>
                    <p className={`${outfit.className} text-sm lg:text-base`}>UNIQUE TRAVELS</p>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-4 px-1">
                    <li>
                        {packagesLink}
                    </li>
                    <li>
                        <details>
                            <summary>Destinations</summary>
                            {countriesLinks}
                        </details>
                    </li>
                    <li>
                        {workAbroadLink}
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn btn-sm text-base-100 btn-neutral bg-neutral/90 font-medium">Contact Us</a>
            </div>
        </div>
    )
}