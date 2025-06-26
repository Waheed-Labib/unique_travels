'use client'

import Image from "next/image";
import { country } from "../../../../lib/types";

const EditCountry = ({ country }: { country: country }) => {

    return (
        <div className="">
            {
                <>
                    <p>{country.name}</p>

                    <Image
                        src={country.image}
                        alt="country landscape image"
                        width={200}
                        height={80}
                    >
                    </Image>
                </>
            }
        </div>
    );
};

export default EditCountry;