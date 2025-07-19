import React from 'react';

const DisplayCountries = ({ countries }: {
    countries: string[] | undefined;
}) => {
    return (
        <div className='mt-4'>

            <label className="label font-semibold text-primary">Countries</label>

            <p className='italic text-xs mb-4'>*Countries can not be changed.</p>

            {countries && countries.length > 0 && countries.map((country, index) => (
                <input
                    key={index}
                    type='text'
                    defaultValue={country}
                    readOnly
                    className='text-sm w-64 border border-secondary rounded px-2 py-1 mb-2 block'
                />
            ))}
        </div>
    );
};

export default DisplayCountries;