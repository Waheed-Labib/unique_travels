'use client'

import React, { useEffect, useState } from 'react';
import { country } from '../../../../lib/types';
import { FaPlus } from "react-icons/fa";
import { cn } from '../../../../lib/utils';

const Page = () => {

    const [originalCountries, setOriginalCountries] = useState<country[]>([])

    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {

        const getCountries = async () => {
            try {
                const res = await fetch('/api/countries');
                const data = await res.json();
                setOriginalCountries(data.data);
            } catch (error) {
                console.error(error)
            } finally {
                setDataLoading(false)
            }
        }

        getCountries();
    }, [])

    if (dataLoading) {
        return <div className='text-center'>
            <p>Loading Countries ...</p>
        </div>
    }

    return (
        <div className='text-neutral flex flex-col items-center gap-4'>
            <button className='btn btn-primary glass bg-primary'>
                <FaPlus></FaPlus>
                <p className=''>Add New Country</p>
            </button>

            <div>
                {
                    originalCountries.map(country => <p key={country._id}>{country.name}</p>)
                }
            </div>
        </div>
    );
};

export default Page;