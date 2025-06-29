'use client'

import React, { FormEvent, useEffect, useState } from 'react';
import DashboardHeading from '../../../dashboardHeading';
import ErrorAlert from '../../../../../ui/modals/error-alert/ErrorAlert';
import CountryImage from './add-country-image/addCountryImage';
import { UnsplashImage } from '../../../../../lib/types';
import AddCountryImage from './add-country-image/addCountryImage';

const unsplashClientId = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID;

const Page = () => {

    const [name, setName] = useState('');
    const [nameSubmitted, setNameSubmitted] = useState(false);
    const [nameSubmitting, setNameSubmitting] = useState(false);

    const [images, setImages] = useState<UnsplashImage[]>([]);
    const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(null);

    const [visaRequirements, setVisaRequirements] = useState<string[]>([]);

    const [formSubmitting, setFormSubmitting] = useState(false);

    const [error, setError] = useState('');

    const handleNameSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setNameSubmitting(true);

        try {
            const res = await fetch('/api/check-country-exist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ countryName: name })
            });

            const data = await res.json();

            if (data.data.countryExists) {
                setError('Country Already Exists');
            } else {
                setNameSubmitted(true);
            }

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Something Went Wrong while Checking Country Name');
            }
        } finally {
            setNameSubmitting(false);
        }
    };

    useEffect(() => {
        if (!name) {
            setNameSubmitted(false);
        }
    }, [name])

    useEffect(() => {

        if (nameSubmitted) {

            fetch(`https://api.unsplash.com/search/photos/?client_id=${unsplashClientId}&query=${name}&page=1&orientation=landscape`)
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
    }, [name, nameSubmitted])

    const handleAddCountry = () => {

    };

    return (
        <div className='flex flex-col gap-8 items-center'>
            <DashboardHeading>
                Add New Country
            </DashboardHeading>

            {/* TODO: This code needs to be cleaner */}
            <form onSubmit={handleAddCountry} className="mt-8 text-neutral">
                <label className="label text-sm font-semibold text-primary">Country Name</label>
                <input
                    onChange={(e) => setName(e.target.value)}
                    name='name'
                    type="text"
                    placeholder='country name'
                    className="input w-64 border-base-200"
                />

                {!nameSubmitted ? (
                    name ? (
                        nameSubmitting ? (
                            <button
                                disabled
                                className="btn bg-neutral/80 text-white mt-4 block w-64"
                            >
                                Loading ...
                            </button>
                        ) : (
                            <button
                                onClick={handleNameSubmit}
                                className="btn bg-neutral/90 text-white hover:bg-neutral/95 mt-4 block w-64"
                            >
                                Submit
                            </button>
                        )
                    ) : (
                        <button
                            disabled
                            className="btn bg-neutral/80 text-white mt-4 block w-64"
                        >
                            Submit
                        </button>
                    )
                ) : null}

                {
                    name && nameSubmitted ?
                        <div className='mt-8'>
                            <AddCountryImage
                                images={images}
                                selectedImage={selectedImage}
                                setSelectedImage={setSelectedImage}
                            ></AddCountryImage>

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
                        (nameSubmitted && selectedImage && visaRequirements) ?
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
                error && (
                    <ErrorAlert error={error} setError={setError} />
                )
            }
        </div >
    );
};

export default Page;
