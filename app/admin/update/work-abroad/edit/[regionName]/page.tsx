'use client';

import React, { use, useEffect, useState } from 'react';
import DashboardHeading from '../../../../dashboardHeading';
import { circular, Region } from '../../../../../../lib/types';
import ErrorAlert from '../../../../../../ui/modals/error-alert/ErrorAlert';
import SuccessAlert from '../../../../../../ui/modals/success-alert/SuccessAlert';
import Circulars from './update-circulars/circulars';
import UpdateImage from './updateImage';

const Page = ({ params }: {
    params: Promise<{ regionName: string }>
}) => {

    const { regionName } = use(params);

    const [dataLoading, setDataLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const [region, setRegion] = useState<Region | null>(null);

    const [newImage, setNewImage] = useState<string | null>(null);

    const [circulars, setCirculars] = useState<circular[]>([]);

    useEffect(() => {
        const fetchRegionDetails = async () => {
            try {
                const res = await fetch(`/api/regions?name=${regionName}`);
                if (!res.ok) {
                    setError('Failed to fetch region details');
                }
                const data = await res.json();

                setRegion(data.data);

                const circularResponse = await fetch(`/api/circulars?region=${regionName}`);
                if (!circularResponse.ok) {
                    setError('Failed to fetch circulars');
                } else {
                    const circularData = await circularResponse.json();
                    setCirculars(circularData.data);
                }

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

    if (dataLoading) {
        return (
            <div>
                <DashboardHeading>
                    Edit {regionName}
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
                regionName={region?.name || ''}
                originalImage={region?.image}
                newImage={newImage}
                setNewImage={setNewImage}
            ></UpdateImage>

            <Circulars
                regionName={regionName}
                circulars={circulars}
                setCirculars={setCirculars}
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