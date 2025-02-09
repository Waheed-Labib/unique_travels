import Link from "next/link";
import circleLogo from '../../app/favicon.ico'
import Image from "next/image";
import { BsFillTelephoneFill } from "react-icons/bs";
import { Outfit } from "next/font/google";

const outfit = Outfit({
    subsets: ['latin'],
    weight: ['400']
})

export default function Navbar() {

    const fakeCountries = [
        {
            countryName: 'Indonesia',
            href: '/destinations/indonesia'
        },
        {
            countryName: 'Malayasia',
            href: '/destinations/malayasia'
        },
        {
            countryName: 'Nepal',
            href: '/destinations/nepal'
        },
    ]

    return (
        <div className="navbar bg-base-100 text-neutral shadow-lg">
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
                            <Link href={'/packages'}>
                                Packages
                            </Link>
                        </li>
                        <li>
                            <Link href={'/destinations'}>Destinations</Link>
                            <ul className="p-2">
                                {
                                    fakeCountries.map(country => <li key={country.countryName}><Link href={country.href}>{country.countryName}</Link></li>)
                                }
                            </ul>
                        </li>
                        <li><Link href={'/work-abroad'}>Work Abroad</Link></li>
                    </ul>
                </div>
                <Link href={'/'} className="btn btn-ghost">
                    <Image src={circleLogo} alt='logo' className="w-10 h-10"></Image>
                    <p className={`${outfit.className} mt-2 text-lg`}>UNIQUE TRAVELS</p>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-4 px-1">
                    <li>
                        <Link href={'/packages'}>
                            Packages
                        </Link>
                    </li>
                    <li>
                        <details>
                            <summary>Destinations</summary>
                            <ul className="p-2">
                                {
                                    fakeCountries.map(country => <li key={country.countryName}><Link href={country.href}>{country.countryName}</Link></li>)
                                }
                            </ul>
                        </details>
                    </li>
                    <li><Link href={'/work-abroad'}>Work Abroad</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn btn-primary btn-circle text-base-100 text-xl">
                    <BsFillTelephoneFill />
                </a>
            </div>
        </div>
    )
}