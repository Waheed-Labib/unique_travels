'use client'

import Image from "next/image";
import { country } from "../../../../lib/types";

const EditCountry = ({ country }: { country: country }) => {

    return (
        <div className="">
            {
                <>
                    <p className="text-neutral/80 text-xl font-bold">{country.name}</p>

                    <Image
                        src={country.image}
                        alt="country landscape image"
                        width={1000}
                        height={600}
                        className="w-full h-auto object-cover"
                    />

                </>
            }
        </div>
    );
};

export default EditCountry;