'use client';

import { useRouter } from 'next/navigation';
import React, { use, useState } from 'react';
import ErrorAlert from '../../../../../../ui/modals/error-alert/ErrorAlert';
import SuccessAlert from '../../../../../../ui/modals/success-alert/SuccessAlert';

const Page = ({ params }: {
    params: Promise<{ regionName: string }>
}) => {

    const { regionName } = use(params);

    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const router = useRouter();

    const handleDeleteRegion = async () => {
        try {
            const res = await fetch(`/api/regions`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: regionName
                })
            });

            const data = await res.json();

            if (data.success) {
                setSuccess('Region deleted successfully');
                router.push('/admin/update/work-abroad');
            } else {
                setError(data.message || 'Failed to delete region');
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Failed to delete region');
            }
        }

    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Delete {regionName}</h1>
            <p className="text-gray-600">Are you sure you want to delete this region? This action cannot be undone.</p>
            <div className="mt-4">
                <button
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                    onClick={handleDeleteRegion}
                >
                    Delete {regionName}
                </button>

                <button
                    className="ml-4 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                    onClick={() => window.history.back()}>
                    Cancel
                </button>
            </div>

            {
                error && <ErrorAlert error={error} setError={setError}></ErrorAlert>
            }

            {
                success && <SuccessAlert success={success} setSuccess={setSuccess}></SuccessAlert>
            }
        </div>
    );
};

export default Page;