'use client';

import React, { useEffect, useState } from 'react';
import AddRegionBtn from './addRegionBtn';
import { Region } from '../../../../lib/types';
import ErrorAlert from '../../../../ui/modals/error-alert/ErrorAlert';
import RegionCard from '../../../../ui/work-abroad/regionCard';

const Page = () => {
    const [originalRegions, setOriginalRegions] = useState<Region[]>([])

    const [dataLoading, setDataLoading] = useState(true);

    const [error, setError] = useState<string>('');

    useEffect(() => {

        const getRegions = async () => {
            try {
                const res = await fetch('/api/regions');
                const data = await res.json();
                setOriginalRegions(data.data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Failed to fetch regions');
                }
            } finally {
                setDataLoading(false)
            }
        }

        getRegions();
    }, [])

    return (
        <div className='text-neutral flex flex-col items-center gap-16 w-full'>
            <AddRegionBtn></AddRegionBtn>

            {
                dataLoading ?
                    <p>Loading Regions ...</p>
                    :
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 w-full'>
                        {
                            originalRegions.map(region => (
                                <div key={region._id}>
                                    <RegionCard
                                        region={region}
                                        isAdmin={true} />
                                </div>
                            ))
                        }
                    </div>
            }

            {
                error && <ErrorAlert error={error} setError={setError}></ErrorAlert>
            }
        </div >
    );
};

export default Page;