'use client'

import React, { useEffect, useState } from 'react';
import DashboardHeading from '../../../../dashboardHeading';
import { pkg } from '../../../../../../lib/types';

const Page = ({
    params,
}: {
    params: Promise<{ countryName: string }>;
}) => {

    const { countryName } = React.use(params);

    const [packages, setPackages] = useState<pkg[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getPackages = async () => {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:3000/api/packages?country=${countryName}`);
                const data = await res.json();
                setPackages(data.data);
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        getPackages();
    }, [countryName])

    return (
        <div className='flex flex-col items-center gap-8'>
            <DashboardHeading>
                Delete {countryName}?
            </DashboardHeading>

            {
                packages.length > 1 &&
                <p className='text-sm italic font-medium'>{countryName} is associated with <span className='text-accent font-semibold'>{packages.length} packages</span>.</p>
            }

            {
                packages.length === 1 &&
                <p className='text-sm italic font-medium'>{countryName} is associated with <span className='text-accent font-semibold'>1 package</span></p>
            }

            {
                loading ?
                    <p>Loading ... </p>
                    :
                    <div>
                        <button>Delete</button>
                        <button>Cancel</button>
                    </div>
            }
        </div>
    );
};

export default Page;