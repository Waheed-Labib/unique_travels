'use client'

import React, { useEffect, useState } from 'react';
import DashboardHeading from '../../../../dashboardHeading';
import { pkg } from '../../../../../../lib/types';
import { useRouter } from 'next/navigation';
import SuccessAlert from '../../../../../../ui/modals/success-alert/SuccessAlert';
import ErrorAlert from '../../../../../../ui/modals/error-alert/ErrorAlert';

const Page = ({
    params,
}: {
    params: Promise<{ countryName: string }>;
}) => {

    const { countryName } = React.use(params);

    const [packages, setPackages] = useState<pkg[]>([]);
    const [dataLoading, setDataLoading] = useState(false);

    const [deleting, setDeleting] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();

    useEffect(() => {
        const getPackages = async () => {
            setDataLoading(true);
            try {
                const res = await fetch(`http://localhost:3000/api/packages?country=${countryName}`);
                const data = await res.json();
                setPackages(data.data);
            } catch (error) {
                console.error(error)
            } finally {
                setDataLoading(false)
            }
        }

        getPackages();
    }, [countryName])

    const handleCountryDelete = async () => {

        setDeleting(true);

        const res = await fetch('/api/countries', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: countryName
            })
        });

        if (res.ok) {
            for (let i = 0; i < packages.length; i++) {
                const res = await fetch('/api/packages', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        _id: packages[i]._id
                    })
                });

                if (!res.ok) {
                    console.error(`Package ${packages[i]._id} not deleted.`)
                }
            }

            setSuccess(`${countryName} is Deleted Successfully`)
            setDeleting(false);
            router.push('/admin/update/countries')
        } else {
            setError(`Deleting ${countryName} Failed`);
            setDeleting(false);
        }
    }

    return (
        <div className='flex flex-col items-center gap-8'>
            <DashboardHeading>
                Delete {countryName}?
            </DashboardHeading>

            {
                packages.length > 1 &&
                <p className='text-sm italic font-medium'>{countryName} is associated with <span className='text-accent font-semibold'>{packages.length} packages</span>. These packages will also be deleted.</p>
            }

            {
                packages.length === 1 &&
                <p className='text-sm italic font-medium'>{countryName} is associated with <span className='text-accent font-semibold'>1 package</span>. This package will also be deleted.</p>
            }

            {
                dataLoading ?
                    <p>Package Data Loading ... </p>
                    :
                    <div className='flex items-center gap-8'>
                        {
                            deleting ?
                                <button disabled onClick={handleCountryDelete} className='bg-red-600/40 text-base-100 px-4 py-2 rounded'>Deleting ...</button>
                                :
                                <button onClick={handleCountryDelete} className='bg-red-600/90 hover:bg-red-600 text-base-100 px-4 py-2 rounded'>Delete</button>
                        }

                        <button onClick={() => router.push('/admin/update/countries')} className='bg-neutral/90 hover:bg-neutral text-base-100 px-4 py-2 rounded'>Cancel</button>
                    </div>
            }

            {
                success && <SuccessAlert success={success} setSuccess={setSuccess} />
            }

            {
                error && <ErrorAlert error={error} setError={setError} />
            }
        </div>
    );
};

export default Page;