import Image from 'next/image';
import React, { useState } from 'react';
import { circular } from '../../../../../../lib/types';
import { MdDeleteForever } from 'react-icons/md';
import ErrorAlert from '../../../../../../ui/modals/error-alert/ErrorAlert';
import SuccessAlert from '../../../../../../ui/modals/success-alert/SuccessAlert';

const CircularItem = ({ circularItem, setCirculars }: {
    circularItem: circular,
    setCirculars: React.Dispatch<React.SetStateAction<circular[]>>
}) => {

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const [deleting, setDeleting] = useState(false);

    const handleDeleteCircular = async (circularId: string) => {

        setDeleting(true);

        try {
            const response = await fetch(`/api/circulars`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ _id: circularId })
            });

            const data = await response.json();

            if (data.success) {
                setSuccess('Circular deleted successfully');
                setCirculars(prevCirculars => prevCirculars.filter(item => item._id !== circularId));
            } else {
                setError('Failed to delete circular');
            }

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Failed to delete circular');
            }
        } finally {
            setDeleting(false)
        }
    };

    return (
        <div className="mb-4">
            <Image
                src={circularItem.image}
                alt={circularItem.region}
                height={500}
                width={240}
                className="w-full h-auto" />
            <p className='text-xs'>Created At: {new Date(circularItem.createdAt).toLocaleDateString()}</p>

            {
                deleting ?
                    <button
                        disabled
                        className="w-full btn btn-xs btn-accent mt-2 loading"
                    >Loading ... </button>
                    :
                    <button
                        onClick={() => { handleDeleteCircular(circularItem._id) }}
                        className="w-full btn btn-xs btn-accent mt-2">
                        <div className='flex items-center justify-center gap-2 text-xl'>
                            <span className="text-xs">Delete</span>
                            <MdDeleteForever></MdDeleteForever>
                        </div>

                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                            Delete Circular
                        </span>
                    </button>
            }


            {
                error && <ErrorAlert error={error} setError={setError}></ErrorAlert>
            }

            {
                success && <SuccessAlert success={success} setSuccess={setSuccess}></SuccessAlert>
            }
        </div>
    );
};

export default CircularItem;