'use client';

import React, { use, useEffect, useState } from 'react';
import { PackageDetails, pkg } from '../../../../../../lib/types';
import DashboardHeading from '../../../../dashboardHeading';
import DisplayCountries from './displayCountries';
import EditDetails from './editDetails';

const Page = ({ params }: {
    params: Promise<{ packageCode: string }>
}) => {

    const { packageCode } = use(params);

    const [pkg, setPkg] = useState<pkg | null>(null);
    const [dataLoading, setDataLoading] = useState(true);
    const [error, setError] = useState('');

    const [newDetails, setNewDetails] = useState<PackageDetails>({});

    useEffect(() => {
        const fetchPackageDetails = async () => {
            try {
                const res = await fetch(`/api/packages?code=${packageCode}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch package details');
                }
                const data = await res.json();
                setPkg(data.data);
                setNewDetails(data.data.details || {});
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Failed to fetch package details');
                }
            } finally {
                setDataLoading(false);
            }
        };

        fetchPackageDetails();
    }, [packageCode]);

    if (dataLoading) {
        return (<div>
            <DashboardHeading>
                Edit Package {packageCode}
            </DashboardHeading>

            <p className='mt-8'>Loading Package Details ...</p>
        </div>);
    }

    return (
        <div>
            <DashboardHeading>
                Edit Package {pkg?.code}
            </DashboardHeading>

            <DisplayCountries
                countries={pkg?.countries}
            ></DisplayCountries>

            <EditDetails
                newDetails={newDetails}
                setNewDetails={setNewDetails}
            ></EditDetails>
        </div>
    );
};

export default Page;