import React, { use, useEffect, useState } from 'react';
import { pkg } from '../../../../../../lib/types';

const Page = ({ params }: {
    params: Promise<{ packageCode: string }>
}) => {

    const { packageCode } = use(params);

    const [pkg, setPkg] = useState<pkg | null>(null);
    const [dataLoading, setDataLoading] = useState(true);
    const [error, setError] = useState('');


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

    return (
        <div>
            Edit
        </div>
    );
};

export default Page;