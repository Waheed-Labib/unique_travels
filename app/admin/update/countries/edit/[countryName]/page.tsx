'use client'

import React, { useEffect, useState } from 'react';
import DashboardHeading from '../../../../dashboardHeading';
import Name from './name';
import EditImage from './editImage';
import { country } from '../../../../../../lib/types';

const Page = ({
    params,
}: {
    params: Promise<{ countryName: string }>;
}) => {

    const { countryName } = React.use(params);
    const [country, setCountry] = useState<country | null>(null);

    const [dataLoading, setDataLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`/api/countries?country=${countryName}`)
            .then(res => res.json())
            .then(data => {
                setCountry(data.data)
                setDataLoading(false);
            })
            .catch(error => {
                if (error instanceof Error) {
                    setError(error.message)
                } else {
                    setError('Loading Country Data Failed. Please refresh the page. If the problem persists, check your internet connection.')
                }
            })
    }, [countryName])

    return (
        <div>
            <div className='w-full flex justify-center'>
                <DashboardHeading>
                    Edit {countryName}
                </DashboardHeading>
            </div>

            <div className='mt-8'>
                <Name countryName={countryName}></Name>
            </div>

            {
                dataLoading ?
                    <p>Loading Country Data ...</p>
                    :
                    <div>
                        <div className='mt-8'>
                            {
                                country?.image && <EditImage image={country?.image}></EditImage>
                            }

                        </div>
                    </div>
            }

        </div>
    );
};

export default Page;