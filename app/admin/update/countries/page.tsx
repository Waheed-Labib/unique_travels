'use client'

import React, { useEffect, useState } from 'react';
import { country } from '../../../../lib/types';
import AddCountryBtn from './addCountryBtn';
import Country from './country';

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

    return (
        <div className='text-neutral flex flex-col items-center gap-16 w-full'>

            <AddCountryBtn></AddCountryBtn>

            {
                dataLoading ?
                    <p>Loading Countries ...</p>
                    :
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 w-full'>
                        {
                            originalCountries.map(country => <Country
                                key={country._id}
                                country={country}
                            ></Country>)
                        }
                    </div>
            }

        </div>
    );
};

export default Page;