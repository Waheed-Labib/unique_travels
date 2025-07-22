import React from 'react';
import { Circular } from '../../../../../../models/circular';
import { circular } from '../../../../../../lib/types';
import Image from 'next/image';
import { MdDeleteForever } from 'react-icons/md';

const Circulars = ({ originalCirculars }: {
    originalCirculars: circular[];
}) => {
    return (
        <div>
            <label className="label font-semibold text-primary">2. Update Circulars</label>

            {
                originalCirculars.length > 0 ? (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {originalCirculars.map((circularItem) => (
                            <div key={circularItem._id} className="mb-4">
                                <Image
                                    src={circularItem.image}
                                    alt={circularItem.region}
                                    height={500}
                                    width={240}
                                    className="w-full h-auto" />
                                <p className='text-xs'>Created At: {new Date(circularItem.createdAt).toLocaleDateString()}</p>
                                <button className="w-full btn btn-xs btn-accent mt-2">
                                    <div className='flex items-center justify-center gap-2 text-xl'>
                                        <span className="text-xs">Delete</span>
                                        <MdDeleteForever></MdDeleteForever>
                                    </div>

                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                                        Delete Circular
                                    </span>
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No circulars available.</p>
                )
            }
        </div >
    );
};

export default Circulars;