'use client'

import React, { useEffect, useState } from 'react';
import DashboardHeading from '../../../dashboardHeading';
import ErrorAlert from '../../../../../ui/modals/error-alert/ErrorAlert';
import { UnsplashImage } from '../../../../../lib/types';
import AddCountryImage from './add-country-image/addCountryImage';
import AddVisaRequirements from './add-visa-requirements/addVisaRequirements';
import AddCountryName from './add-country-name/addCountryName';

const unsplashClientId = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID;

const Page = () => {

    const [name, setName] = useState('');
    const [nameSubmitted, setNameSubmitted] = useState(false);

    const [images, setImages] = useState<UnsplashImage[]>([]);
    const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(null);

    const [visaRequirements, setVisaRequirements] = useState<string[]>([]);

    const [formSubmitting, setFormSubmitting] = useState(false);

    const [error, setError] = useState('');

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
                                selectedImage={selectedImage}
                                setSelectedImage={setSelectedImage}
                            ></AddCountryImage>

                            <div className='mt-8'>
                                <AddVisaRequirements></AddVisaRequirements>
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
                error && (
                    <ErrorAlert error={error} setError={setError} />
                )
            }
        </div >
    );
};

export default Page;
