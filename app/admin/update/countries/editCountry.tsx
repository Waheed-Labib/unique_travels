'use client'

import Image from "next/image";
import { country } from "../../../../lib/types";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const EditCountry = ({ country }: { country: country }) => {

    return (
        <div className="">
            {
                <>
                    <div className="flex items-center justify-between">
                        <p className="text-neutral/80 text-2xl font-bold mb-4">{country.name}</p>

                        <div className="flex items-center gap-4 text-2xl">

                            <div className="text-secondary relative group">
                                <FaRegEdit></FaRegEdit>
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                                    Edit
                                </span>
                            </div>

                            <div className="text-accent relative group">
                                <MdDeleteForever></MdDeleteForever>
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                                    Delete
                                </span>
                            </div>

                        </div>
                    </div>


                    <Image
                        src={country.image}
                        alt="country landscape image"
                        width={1000}
                        height={500}
                        className="w-full h-auto object-cover"
                    />

                </>
            }
        </div>
    );
};

export default EditCountry;