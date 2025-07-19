'use client';

import React, { use, useEffect, useState } from 'react';
import { PackageDetails, pkg } from '../../../../../../lib/types';
import DashboardHeading from '../../../../dashboardHeading';
import DisplayCountries from './displayCountries';
import EditDetails from './editDetails';
import { useRouter } from 'next/navigation';
import ErrorAlert from '../../../../../../ui/modals/error-alert/ErrorAlert';
import SuccessAlert from '../../../../../../ui/modals/success-alert/SuccessAlert';

const Page = ({ params }: {
    params: Promise<{ packageCode: string }>
}) => {

    const { packageCode } = use(params);

    const [pkg, setPkg] = useState<pkg | null>(null);
    const [dataLoading, setDataLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [newDetails, setNewDetails] = useState<PackageDetails>({});

    const [editing, setEditing] = useState(false);
    const [changed, setChanged] = useState(false);

    const router = useRouter()

    const handleEditPackage = async () => {
        setEditing(true);

        try {
            const res = await fetch('/api/packages', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id: pkg?._id,
                    details: newDetails
                })
            });

            if (res.ok) {
                setSuccess('Package updated successfully');
                router.push('/admin/update/packages');
            } else {
                const data = await res.json();
                setError(data.message || 'Failed to update package');
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Failed to update package');
            }
        }
    }

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
                setChanged={setChanged}
            ></EditDetails>

            {
                changed ?
                    <>
                        {
                            editing ?
                                <button
                                    disabled
                                    className="btn bg-neutral/80 text-white mt-4 block w-64"
                                >
                                    Loading ...
                                </button>
                                :
                                <button
                                    onClick={handleEditPackage}
                                    className="btn bg-neutral/90 text-white hover:bg-neutral/95 mt-4 block w-64"
                                >
                                    Submit
                                </button>
                        }
                    </>
                    :
                    < button
                        disabled
                        className="btn bg-neutral/80 text-white mt-4 block w-64"
                    >
                        Submit
                    </button>
            }

            {
                error && <ErrorAlert error={error} setError={setError} />
            }

            {
                success && <SuccessAlert success={success} setSuccess={setSuccess} />
            }
        </div>
    );
};

export default Page;