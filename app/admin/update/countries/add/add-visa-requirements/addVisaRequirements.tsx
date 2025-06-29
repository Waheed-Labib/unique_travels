import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const AddVisaRequirements = ({ visaRequirements, setVisaRequirements }: {
    visaRequirements: string[],
    setVisaRequirements: React.Dispatch<React.SetStateAction<string[]>>
}) => {

    const [noOfInputs, setNoOfInputs] = useState(1);

    const handleAddRequirement = (index: number, value: string) => {
        const updated = [...visaRequirements];
        updated[index] = value;
        setVisaRequirements(updated)
    }

    const handleAddInput = () => {
        setNoOfInputs(prev => prev + 1);
        setVisaRequirements(prev => [...prev, ""]);
    }

    return (
        <div>
            <label className="label text-sm font-semibold text-primary">3. Add Visa Requirements</label>

            <div className='my-8'>
                {
                    Array.from({ length: noOfInputs }, (_, index) =>
                        <input
                            key={index}
                            type='text'
                            placeholder={`Requirement ${index + 1}`}
                            onChange={e => handleAddRequirement(index, e.target.value)}
                            className='w-full border border-secondary rounded px-8 py-4 mb-2'
                        ></input>
                    )
                }
                <button
                    type='button'
                    onClick={handleAddInput}
                    className='mt-4 flex items-center justify-center gap-2 bg-primary/80 hover:bg-primary/90 rounded-sm text-sm text-base-100 px-2 py-1'>
                    <FaPlus></FaPlus>
                    <p>Add Field</p>
                </button>

                <p className='italic text-xs mt-4'>*Empty lines will automatically be removed</p>
            </div>

        </div>
    );
};

export default AddVisaRequirements;