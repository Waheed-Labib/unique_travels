'use client';

import React, { useEffect, useState } from 'react';
import AddRegionBtn from './addRegionBtn';
import { Region } from '../../../../lib/types';
import ErrorAlert from '../../../../ui/modals/error-alert/ErrorAlert';
import RegionCard from '../../../../ui/work-abroad/regionCard';
import Link from 'next/link';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

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
                                    <div className="flex items-center justify-end gap-4 text-2xl pb-2">
                                        <Link
                                            href={`/admin/update/work-abroad/edit/${region.name}`}
                                            className="text-secondary relative group">
                                            <FaRegEdit></FaRegEdit>
                                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                                                Edit
                                            </span>
                                        </Link>

                                        <Link
                                            href={`/admin/update/work-abroad/delete/${region.name}`}
                                            className="text-accent relative group"
                                        >
                                            <MdDeleteForever></MdDeleteForever>
                                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                                                Delete
                                            </span>
                                        </Link>

                                    </div>
                                    <RegionCard
                                        region={region}
                                        isAdminDashboard={true} />
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