import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const AddDetails = ({
    packageDetails,
    setPackageDetails
}: {
    packageDetails: { [key: string]: string },
    setPackageDetails: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>
}) => {

    console.log(packageDetails);

    const [inputs, setInputs] = useState<{ key: string; value: string; }[]>(
        Array.from({ length: 4 }, () => ({ key: '', value: '' }))
    );

    // Handle input changes and update packageDetails in real-time
    const handleInputChange = (index: number, field: 'key' | 'value', newValue: string) => {
        const updatedInputs = [...inputs];
        updatedInputs[index][field] = newValue;
        setInputs(updatedInputs);

        // Update packageDetails (only non-empty keys)
        const updatedPackageDetails: { [key: string]: string } = {};
        updatedInputs.forEach(item => {
            if (item.key.trim() !== '') {
                updatedPackageDetails[item.key] = item.value;
            }
        });

        setPackageDetails(updatedPackageDetails);
    };

    // Add a new empty input field
    const handleAddInput = () => {
        setInputs(prev => [...prev, { key: '', value: '' }]);
    };

    return (
        <div className='mt-4'>
            <label className="label font-semibold text-primary">2. Details</label>

            <div className='mt-2'>
                {inputs.map((input, index) => (
                    <div
                        key={index}
                        className='flex flex-col md:flex-row md:items-center gap-1 md:gap-2 mb-6'
                    >
                        <input
                            type='text'
                            placeholder={`key ${index + 1} :`}
                            value={input.key}
                            onChange={(e) => handleInputChange(index, 'key', e.target.value)}
                            className='text-sm w-64 md:w-32 border border-secondary rounded px-2 py-1 mb-2 block'
                        />

                        <input
                            type='text'
                            placeholder={`value ${index + 1}`}
                            value={input.value}
                            onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                            className='text-sm w-64 border border-secondary rounded px-2 py-1 mb-2 block'
                        />
                    </div>
                ))}

                <button
                    type='button'
                    onClick={handleAddInput}
                    className='flex items-center justify-center gap-2 bg-primary/80 hover:bg-primary/90 rounded-sm text-xs text-base-100 px-2 py-1 mb-2'
                >
                    <FaPlus />
                    <p>Add Field</p>
                </button>

                <p className='italic text-xs'>*Lines with empty key will be removed automatically</p>
            </div>
        </div>
    );
};

export default AddDetails;
