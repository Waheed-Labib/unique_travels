'use client'

import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import ErrorAlert from '../../../../../ui/modals/error-alert/ErrorAlert';

const AddCountries = ({ countries, setCountries }: {
    countries: string[],
    setCountries: React.Dispatch<React.SetStateAction<string[]>>
}) => {

    const [dataLoading, setDataLoading] = useState(true);
    const [error, setError] = useState('');
    const [allCountries, setAllCountries] = useState<string[]>([]);

    useEffect(() => {
        fetch('/api/countries')
            .then(res => res.json())
            .then(data => {
                const fetchedCountries = data.data.map((country: { name: string }) => country.name);
                setAllCountries(fetchedCountries);

                // Initialize with 3 empty selections if countries is empty
                if (countries.length === 0) {
                    setCountries(["", "", ""]);
                }
            })
            .catch(error => {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Something Went Wrong while Fetching Countries');
                }
            })
            .finally(() => {
                setDataLoading(false);
            });
    }, [setCountries, countries.length]);

    const handleSelectCountry = (index: number, value: string) => {
        const updated = [...countries];
        updated[index] = value;
        setCountries(updated);
    }

    const handleAddSelect = () => {
        setCountries(prev => [...prev, ""]);
    }

    if (dataLoading) {
        return <p className='text-center text-sm text-secondary'>Loading countries...</p>;
    }

    return (
        <div className='mt-4'>
            <label className="label font-semibold text-primary">1. Countries</label>

            <div className='mt-2'>
                {countries.map((selectedCountry, index) => (
                    <select
                        key={index}
                        value={selectedCountry}
                        onChange={e => handleSelectCountry(index, e.target.value)}
                        className='text-sm w-64 border border-secondary rounded px-2 py-1 mb-2 block'
                    >
                        <option value="">Select Country {index + 1}</option>
                        {allCountries.map((country, idx) => (
                            <option key={idx} value={country}>{country}</option>
                        ))}
                    </select>
                ))}

                <button
                    type='button'
                    onClick={handleAddSelect}
                    className='flex items-center justify-center gap-2 bg-primary/80 hover:bg-primary/90 rounded-sm text-xs text-base-100 px-2 py-1'
                >
                    <FaPlus />
                    <p>Add Field</p>
                </button>

                <p className='italic text-xs mt-2'>*Empty selections will be removed automatically</p>
            </div>

            {error && <ErrorAlert error={error} setError={setError} />}
        </div>
    );
};

export default AddCountries;
