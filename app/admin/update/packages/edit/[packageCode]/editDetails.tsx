import React from 'react';
import { PackageDetails } from '../../../../../../lib/types';

const EditDetails = ({ newDetails, setNewDetails }: {
    newDetails: PackageDetails,
    setNewDetails: React.Dispatch<React.SetStateAction<PackageDetails>>
}) => {
    console.log('newDetails', newDetails);
    return (
        <div className='mt-4'>
            <label className="label font-semibold text-primary">Edit Details</label>

            {Object.keys(newDetails).map((key) => (
                <div className='flex flex-col md:flex-row gap-1 mb-4 md:mb-2' key={key}>
                    <input
                        type='text'
                        value={key}
                        onChange={(e) => setNewDetails(prev => ({ ...prev, [e.target.value]: prev[key] }))}
                        className='text-sm w-64 border border-secondary rounded px-2 py-1 block'
                    />
                    <input
                        type='text'
                        value={newDetails[key]}
                        onChange={(e) => setNewDetails(prev => ({ ...prev, [key]: e.target.value }))}
                        className='text-sm w-64 border border-secondary rounded px-2 py-1 block'
                    />
                </div>
            ))}

        </div>
    );
};

export default EditDetails;