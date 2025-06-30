import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const AddDetails = () => {

    const [noOfInputs, setNoOfInputs] = useState(4);

    const handleAddInput = () => {
        setNoOfInputs(prev => prev + 1);
    }

    return (
        <div className='mt-4'>
            <label className="label font-semibold text-primary">2. Details</label>

            <div className='mt-2'>
                {
                    Array.from({ length: noOfInputs }, (_, index) =>
                        <div
                            key={index}
                            className='flex flex-col md:flex-row md:items-center gap-1 md:gap-2 mb-6'
                        >
                            <input
                                type='text'
                                placeholder={`key ${index + 1}`}
                                className='text-sm w-64 md:w-32 border border-secondary rounded px-2 py-1 mb-2 block'
                            ></input>

                            <input
                                type='text'
                                placeholder={`value ${index + 1}`}
                                className='text-sm w-64 border border-secondary rounded px-2 py-1 mb-2 block'
                            ></input>
                        </div>
                    )
                }
                <button
                    type='button'
                    onClick={handleAddInput}
                    className='flex items-center justify-center gap-2 bg-primary/80 hover:bg-primary/90 rounded-sm text-xs text-base-100 px-2 py-1'>
                    <FaPlus></FaPlus>
                    <p>Add Field</p>
                </button>

                <p className='italic text-xs mt-2'>*Lines with empty key will be removed automatically</p>
            </div>
        </div>
    );
};

export default AddDetails;