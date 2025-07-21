import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';


const EditDetails = ({ initialDetails, setNewDetails, setChanged }: {
    initialDetails: { [key: string]: string },
    setNewDetails: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>,
    setChanged: React.Dispatch<React.SetStateAction<boolean>>
}) => {

    const [detailsArray, setDetailsArray] = useState(
        Object.entries(initialDetails).map(([key, value]) => ({ key, value }))
    );

    useEffect(() => {
        const filtered = detailsArray
            .filter(d => d.key.trim() !== '')
            .reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {});

        setNewDetails(filtered);

    }, [detailsArray, setNewDetails]);

    useEffect(() => {
        // Mark as changed if detailsArray differs from initialDetails
        const current = Object.fromEntries(
            detailsArray.filter(d => d.key.trim() !== '').map(d => [d.key, d.value])
        );
        setChanged(JSON.stringify(current) !== JSON.stringify(initialDetails));
    }, [detailsArray, initialDetails, setChanged]);

    const handleInputChange = (index: number, field: 'key' | 'value', value: string) => {
        setDetailsArray(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const handleAddInput = () => {
        setDetailsArray(prev => [...prev, { key: '', value: '' }]);
    };

    return (
        <div className='mt-4'>
            <label className="label font-semibold text-primary">Edit Details</label>

            {detailsArray.map((input, index) => (
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
    );
};

export default EditDetails;