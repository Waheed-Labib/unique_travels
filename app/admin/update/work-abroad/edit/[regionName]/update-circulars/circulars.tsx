import React, { useState } from 'react';
import { circular } from '../../../../../../../lib/types';
import CircularItem from './circularItem';
import { FaPlus } from 'react-icons/fa';

const Circulars = ({ circulars, setCirculars }: {
    circulars: circular[];
    setCirculars: React.Dispatch<React.SetStateAction<circular[]>>
}) => {

    const [addCircularClicked, setAddCircularClicked] = useState(false);

    return (
        <div>
            <label className="label font-semibold text-primary">2. Update Circulars</label>

            <button
                onClick={() => setAddCircularClicked(true)}
                className='btn btn-sm btn-primary glass bg-primary w-full my-2'>
                <FaPlus></FaPlus>
                <p className=''>Add New Circular</p>
            </button>

            {
                circulars.length > 0 ? (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {circulars.map((circularItem) => (
                            <CircularItem
                                key={circularItem._id}
                                circularItem={circularItem}
                                setCirculars={setCirculars}
                            ></CircularItem>
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