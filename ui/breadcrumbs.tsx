import Link from "next/link";
import { outfit } from "../app/layout";

const Breadcrumbs = ({ image, name, part2, part3 }: {
    image?: string,
    name?: string,
    part2: string,
    part3?: string
}) => {
    return (
        <div
            className={`p-0 bg-neutral ${image ? 'h-48 bg-cover bg-center bg-no-repeat' : 'h-24'}`}
            style={image ? { backgroundImage: `url(${image})` } : {}}
        >
            <div
                className={`breadcrumbs flex justify-center items-center w-full h-full text-slate-50 ${image ? 'flex-col gap-8 bg-neutral/75' : 'bg-gradient-to-tr from-neutral to-neutral/25'}`}

            >
                {
                    name ?
                        <p className={`${outfit.className} text-2xl font-semibold`}>{name}</p>
                        :
                        <></>
                }

                <ul className="text-sm py-2 px-4 italic rounded-sm">
                    <li><Link href="/" className="">home</Link></li>
                    <li><Link href={`/${part2}`} className="">{part2}</Link></li>
                    {
                        part3 ?
                            <li>{part3}</li>
                            :
                            <></>
                    }
                </ul>
            </div >
        </div >
    );
};

export default Breadcrumbs;