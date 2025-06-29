import React from 'react';

const Name = ({ countryName }: {
    countryName: string
}) => {
    return (
        <div>
            <label className="label text-sm font-semibold text-primary">1. Country Name</label>
            <input
                type="text"
                defaultValue={countryName}
                readOnly
                className="input w-64 border-base-200"
            />
            <p className='italic text-xs mt-2'>Name cannot be changed</p>
        </div>
    );
};

export default Name;