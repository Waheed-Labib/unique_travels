'use client'

import React, { useEffect, useState } from 'react';
import DashboardHeading from '../../../../dashboardHeading';
import Name from './name';
import EditImage from './editImage';
import { country, UnsplashImage } from '../../../../../../lib/types';
import EditRequirements from './editRequirements';
import ErrorAlert from '../../../../../../ui/modals/error-alert/ErrorAlert';

const Page = ({
    params,
}: {
    params: Promise<{ countryName: string }>;
}) => {

    const { countryName } = React.use(params);
    const [country, setCountry] = useState<country | null>(null);

    const [dataLoading, setDataLoading] = useState(true);
    const [error, setError] = useState('');

    const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(null);
    const [newRequirements, setNewRequirements] = useState<string[]>([]);

    useEffect(() => {
        fetch(`/api/countries?country=${countryName}`)
            .then(res => res.json())
            .then(data => {
                setCountry(data.data);
                setDataLoading(false);
            })
            .catch(error => {
                if (error instanceof Error) {
                    setError(error.message)
                } else {
                    setError('Loading Country Data Failed. Please refresh the page. If the problem persists, check your internet connection.')
                }
            })
    }, [countryName])

    useEffect(() => {
        if (country) {
            setNewRequirements(country.visaRequirements)
        }
    }, [country])

    return (
        <div>
            <div className='w-full flex justify-center'>
                <DashboardHeading>
                    Edit {countryName}
                </DashboardHeading>
            </div>

            <div className='mt-8'>
                <Name countryName={countryName}></Name>
            </div>

            {
                dataLoading ?
                    <p className='mt-8'>Loading Country Data ...</p>
                    :
                    <div>
                        <div className='mt-8'>
                            {
                                country?.image && <EditImage
                                    countryName={countryName}
                                    image={country?.image}
                                    selectedImage={selectedImage}
                                    setSelectedImage={setSelectedImage}
                                ></EditImage>
                            }

                        </div>
                        <div className='my-8'>
                            {
                                country?.visaRequirements && <EditRequirements
                                    oldRequirements={country?.visaRequirements}
                                    newRequirements={newRequirements}
                                    setNewRequirements={setNewRequirements}
                                ></EditRequirements>
                            }

                        </div>
                    </div>
            }

            {
                error && <ErrorAlert error={error} setError={setError} />
            }

        </div>
    );
};

export default Page;