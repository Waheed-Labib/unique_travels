'use client'

import React, { useEffect, useState } from 'react';
import { country } from '../../../../lib/types';
import { FaPlus } from "react-icons/fa";
import EditCountry from './editCountry';

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
        <div className='text-neutral flex flex-col items-center gap-16 w-full'>
            <button className='btn btn-primary glass bg-primary'>
                <FaPlus></FaPlus>
                <p className=''>Add New Country</p>
            </button>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 w-full'>
                {
                    originalCountries.map(country => <EditCountry
                        key={country._id}
                        country={country}
                    ></EditCountry>)
                }
            </div>
        </div>
    );
};

export default Page;