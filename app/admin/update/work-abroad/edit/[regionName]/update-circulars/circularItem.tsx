import Image from 'next/image';
import React, { useState } from 'react';
import { circular } from '../../../../../../../lib/types';
import ConfirmDeleteCircular from './confirmDeleteCircular';
import { MdDeleteForever } from 'react-icons/md';

const CircularItem = ({ circularItem, setCirculars }: {
    circularItem: circular,
    setCirculars: React.Dispatch<React.SetStateAction<circular[]>>
}) => {

    const [confirmDeleteCircularOpen, setConfirmDeleteCircularOpen] = useState(false);

    return (
        <div className="mb-4">
            <Image
                src={circularItem.image}
                alt={circularItem.region}
                height={500}
                width={240}
                className="w-full h-auto" />
            <p className='text-xs'>Created At: {new Date(circularItem.createdAt).toLocaleDateString()}</p>

            <button
                onClick={() => setConfirmDeleteCircularOpen(true)}
                className="btn btn-xs btn-accent w-full mt-1"
            >
                <div className='flex items-center justify-center gap-2 text-xl'>
                    <p className='text-xs'>Delete</p>
                    <MdDeleteForever></MdDeleteForever>
                </div>

                <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                    Delete
                </span>
            </button>


            {
                confirmDeleteCircularOpen && (
                    <ConfirmDeleteCircular
                        circularId={circularItem._id}
                        confirmDeleteCircularOpen={confirmDeleteCircularOpen}
                        setConfirmDeleteCircularOpen={setConfirmDeleteCircularOpen}
                        setCirculars={setCirculars}
                    ></ConfirmDeleteCircular>
                )
            }


        </div>
    );
};

export default CircularItem;