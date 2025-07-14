'use client'

import React, { useEffect, useState } from 'react';
import { pkg } from '../../../../../../lib/types';
import ErrorAlert from '../../../../../../ui/modals/error-alert/ErrorAlert';
import SuccessAlert from '../../../../../../ui/modals/success-alert/SuccessAlert';
import { useRouter } from 'next/navigation';

const Page = ({ params }: {
    params: Promise<{ packageCode: string }>
}) => {

    const { packageCode } = React.use(params);

    const [pkg, setPkg] = useState<pkg | null>(null);
    const [dataLoading, setDataLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const router = useRouter();

    useEffect(() => {
        const fetchPackageDetails = async () => {
            try {
                const res = await fetch(`/api/packages?code=${packageCode}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch package details');
                }
                const data = await res.json();
                setPkg(data.data);
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

    const handleDeletePackage = async () => {
        const res = await fetch(`/api/packages`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: pkg?.code
            })
        })

        if (res.ok) {
            setSuccess('Package deleted successfully');
            router.push('/admin/update/packages');
        } else {
            setError('Failed to delete package');
        }
    };

    return (

        <div>
            <h1 className="text-2xl font-bold mb-4">Delete Package</h1>
            <p className="text-gray-600">Are you sure you want to delete this package? This action cannot be undone.</p>
            <div className="mt-4">
                <button
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                    onClick={handleDeletePackage}
                >
                    Delete Package
                </button>

                <button
                    className="ml-4 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                    onClick={() => window.history.back()}>
                    Cancel
                </button>
            </div>

            <div className="mt-8">
                {
                    dataLoading ?
                        <p>Loading package details...</p>
                        :
                        <div>
                            <p className="text-lg font-semibold">Package Code: {pkg?.code}</p>
                            <p className="my-4">Countries:
                                {
                                    pkg && pkg.countries &&
                                    pkg?.countries.map(country => (
                                        <span key={country} className="p-2 border mx-2 rounded text-base font-semibold">
                                            {country}
                                        </span>
                                    ))
                                }
                            </p>
                            <table className="table-auto border border-gray-300 w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border px-4 py-2 text-left">Key</th>
                                        <th className="border px-4 py-2 text-left">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pkg && pkg.details
                                        ? Object.entries(pkg.details).map(([key, value]) => (
                                            <tr key={key}>
                                                <td className="border px-4 py-2 font-medium capitalize">{key}</td>
                                                <td className="border px-4 py-2">{value}</td>
                                            </tr>
                                        ))
                                        : <tr>
                                            <td colSpan={2} className="border px-4 py-2 text-center text-gray-500">
                                                No package details available.
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                }

                {
                    error && <ErrorAlert error={error} setError={setError} />
                }

                {
                    success && <SuccessAlert success={success} setSuccess={setSuccess} />
                }
            </div>
        </div >
    );
};

export default Page;