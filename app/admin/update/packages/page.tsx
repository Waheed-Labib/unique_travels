'use client'

import React, { useEffect, useState } from 'react';
import AddPkgBtn from './addPkgBtn';
import { pkg } from '../../../../lib/types';
import Pkg from './pkg';
import ErrorAlert from '../../../../ui/modals/error-alert/ErrorAlert';

const Page = () => {

    const [originalPackages, setOriginalPackages] = useState<pkg[] | null>(null);
    const [dataLoading, setDataLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`/api/packages`)
            .then(res => res.json())
            .then(data => {
                setOriginalPackages(data.data);
            })
            .catch(error => {
                if (error instanceof Error) {
                    setError(error.message)
                } else {
                    setError('Failed to load packages')
                }
            })
            .finally(() => {
                setDataLoading(false)
            })
    }, [])

    return (
        <div className='text-neutral'>
            <div className='text-neutral flex flex-col items-center gap-16 w-full'>

                <AddPkgBtn></AddPkgBtn>

                {
                    dataLoading ?
                        <p>Loading Packages ...</p>
                        :
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 w-full'>
                            {
                                originalPackages?.map(pkg => <Pkg
                                    key={pkg._id}
                                    pkg={pkg}
                                ></Pkg>)
                            }
                        </div>
                }

            </div>

            {
                error && <ErrorAlert error={error} setError={setError} />
            }
        </div>
    );
};

export default Page;