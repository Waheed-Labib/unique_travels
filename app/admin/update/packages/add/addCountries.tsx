'use client'

import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const AddCountries = ({ countries, setCountries }: {
    countries: string[],
    setCountries: React.Dispatch<React.SetStateAction<string[]>>
}) => {

    const [noOfInputs, setNoOfInputs] = useState(3);

    const handleAddCountries = (index: number, value: string) => {
        const updated = [...countries];
        updated[index] = value;
        setCountries(updated)
    }

    const handleAddInput = () => {
        setNoOfInputs(prev => prev + 1);
        setCountries(prev => [...prev, ""]);
    }

    return (
        <div className='mt-4'>
            <label className="label font-semibold text-primary">1. Countries</label>

            <div className='mt-2'>
                {
                    Array.from({ length: noOfInputs }, (_, index) =>
                        <input
                            key={index}
                            type='text'
                            placeholder={`Country ${index + 1}`}
                            onChange={e => handleAddCountries(index, e.target.value)}
                            className='text-sm w-64 border border-secondary rounded px-2 py-1 mb-2 block'
                        ></input>
                    )
                }
                <button
                    type='button'
                    onClick={handleAddInput}
                    className='flex items-center justify-center gap-2 bg-primary/80 hover:bg-primary/90 rounded-sm text-xs text-base-100 px-2 py-1'>
                    <FaPlus></FaPlus>
                    <p>Add Field</p>
                </button>

                <p className='italic text-xs mt-2'>*Empty lines will be removed automatically</p>
            </div>

        </div>
    );
};

export default AddCountries;