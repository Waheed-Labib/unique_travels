'use client';

import React, { use, useEffect, useState } from 'react';
import DashboardHeading from '../../../../dashboardHeading';
import { Region } from '../../../../../../lib/types';
import ErrorAlert from '../../../../../../ui/modals/error-alert/ErrorAlert';
import SuccessAlert from '../../../../../../ui/modals/success-alert/SuccessAlert';
import Circulars from './circulars';
import UpdateImage from './updateImage';

const Page = ({ params }: {
    params: Promise<{ regionName: string }>
}) => {

    const { regionName } = use(params);

    const [dataLoading, setDataLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const [region, setRegion] = useState<Region | null>(null);

    useEffect(() => {
        const fetchRegionDetails = async () => {
            try {
                const res = await fetch(`/api/regions?name=${regionName}`);
                if (!res.ok) {
                    setError('Failed to fetch region details');
                }
                const data = await res.json();

                setRegion(data.data);

            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Failed to fetch region details');
                }
            } finally {
                setDataLoading(false);
            }
        };

        fetchRegionDetails();
    }, [regionName]);

    console.log(region);

    if (dataLoading) {
        return (
            <div>
                <DashboardHeading>
                    Edit Region {regionName}
                </DashboardHeading>

                <p>Loading region details...</p>
            </div>
        );
    }

    return (
        <div className='text-neutral flex flex-col items-start gap-8 w-full'>
            <DashboardHeading>
                Edit &apos;{regionName}&apos;
            </DashboardHeading>

            <UpdateImage
                originalImage={region?.image}
            ></UpdateImage>

            <Circulars
                originalCirculars={[]}
            ></Circulars>

            {
                error && <ErrorAlert error={error} setError={setError}></ErrorAlert>
            }

            {
                success && <SuccessAlert success={success} setSuccess={setSuccess}></SuccessAlert>
            }
        </div >
    )
};

export default Page;