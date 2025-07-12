'use client'

import React, { useEffect, useState } from 'react';
import DashboardHeading from '../../../dashboardHeading';
import ErrorAlert from '../../../../../ui/modals/error-alert/ErrorAlert';
import { UnsplashImage } from '../../../../../lib/types';
import AddCountryImage from './add-country-image/addCountryImage';
import AddVisaRequirements from './add-visa-requirements/addVisaRequirements';
import AddCountryName from './add-country-name/addCountryName';
import SuccessAlert from '../../../../../ui/modals/success-alert/SuccessAlert';
import { useRouter } from 'next/navigation';

const unsplashClientId = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID;

const Page = () => {

    const [name, setName] = useState('');
    const [nameSubmitted, setNameSubmitted] = useState(false);

    const [images, setImages] = useState<UnsplashImage[]>([]);
    const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(null);
    const [page, setPage] = useState(1);

    const [visaRequirements, setVisaRequirements] = useState<string[]>([]);

    const [formSubmitting, setFormSubmitting] = useState(false);

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();

    useEffect(() => {
        if (!name) {
            setNameSubmitted(false);
        }
    }, [name])

    useEffect(() => {

        if (nameSubmitted) {

            fetch(`https://api.unsplash.com/search/photos/?client_id=${unsplashClientId}&query=${name}&page=${page}&orientation=landscape`)
                .then(res => res.json())
                .then(data => {
                    setImages(data.results)
                })
                .catch(error => {
                    if (error instanceof Error) {
                        setError(error.message);
                    } else {
                        setError('Something Went Wrong while Fetching Images');
                    }
                })
        }
    }, [name, nameSubmitted, page]);

    const handleAddCountry = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormSubmitting(true);

        try {
            const res = await fetch('/api/countries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    image: selectedImage?.urls.regular,
                    visaRequirements
                })
            });

            if (res.ok) {
                setSuccess('Country Added Successfully');
                router.push('/admin/update/countries')
            } else {
                setError('Failed to Add Country');
            }

        } catch (error) {
            console.error(error);
            setError('Failed to Add Country');
        } finally {
            setFormSubmitting(false);
        }
    };

    return (
        <div className='flex flex-col gap-8 items-center'>
            <DashboardHeading>
                Add New Country
            </DashboardHeading>

            <form onSubmit={handleAddCountry} className="mt-8 text-neutral">

                <AddCountryName
                    name={name}
                    setName={setName}
                    nameSubmitted={nameSubmitted}
                    setNameSubmitted={setNameSubmitted}
                    setError={setError}
                ></AddCountryName>

                {
                    name && nameSubmitted ?
                        <div className='mt-8'>
                            <AddCountryImage
                                images={images}
                                setImages={setImages}
                                selectedImage={selectedImage}
                                setSelectedImage={setSelectedImage}
                                setPage={setPage}
                            ></AddCountryImage>

                            <div className='mt-8'>
                                <AddVisaRequirements
                                    visaRequirements={visaRequirements}
                                    setVisaRequirements={setVisaRequirements}
                                ></AddVisaRequirements>
                            </div>

                        </div>
                        :
                        null
                }

                <div className='w-full flex justify-center'>
                    {
                        (nameSubmitted && (!selectedImage || !visaRequirements.length)) ?
                            < button
                                disabled
                                className="btn bg-neutral/80 text-white mt-4 block w-64"
                            >
                                Submit
                            </button>
                            :
                            null
                    }


                    {
                        (nameSubmitted && selectedImage && visaRequirements.length) ?
                            <>
                                {
                                    formSubmitting ?
                                        <button
                                            disabled
                                            className="btn bg-neutral/80 text-white mt-4 block w-64"
                                        >
                                            Loading ...
                                        </button>
                                        :
                                        <button
                                            type='submit'
                                            className="btn bg-neutral/90 text-white hover:bg-neutral/95 mt-4 block w-64"
                                        >
                                            Submit
                                        </button>
                                }
                            </>

                            :
                            null

                    }
                </div>

            </form >

            {
                success && (
                    <SuccessAlert success={success} setSuccess={setSuccess} />
                )
            }

            {
                error && (
                    <ErrorAlert error={error} setError={setError} />
                )
            }

        </div >
    );
};

export default Page;
