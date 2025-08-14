import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ErrorAlert from '../../../../../../ui/modals/error-alert/ErrorAlert';
import { UnsplashImage } from '../../../../../../lib/types';

const unsplashClientId = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID;

const UpdateImage = ({ regionName, originalImage, newImage, setNewImage }: {
    regionName: string;
    originalImage: string | undefined;
    newImage: string | null;
    setNewImage: React.Dispatch<React.SetStateAction<string | null>>;
}) => {

    const [settingNewImage, setSettingNewImage] = useState(false);
    const [imageOptions, setImageOptions] = useState<UnsplashImage[]>([]);
    const [error, setError] = useState('');

    const [page, setPage] = useState(1);

    const [loadingMoreImages, setLoadingMoreImages] = useState(false);

    useEffect(() => {
        fetch(`https://api.unsplash.com/search/photos/?client_id=${unsplashClientId}&query=${regionName}&page=${page}&orientation=landscape`)
            .then(res => res.json())
            .then(data => {
                setImageOptions(data.results)
            })
            .catch(error => {
                console.error(error)
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Something Went Wrong while Fetching Images');
                }
            })
            .finally(() => {
                setLoadingMoreImages(false);
            })
    }, [regionName, page, setImageOptions]);

    return (
        <div>
            <label className="label font-semibold text-primary">1. Update Image</label>

            <div>
                {
                    settingNewImage ?
                        <div>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                                {
                                    imageOptions.map((image, index) => (
                                        <div key={index} className={`p-4 rounded border border-base-100 hover:bg-secondary/40 hover:border-secondary/60 transition-all cursor-pointer ${newImage === image.urls.regular ? 'bg-secondary/50 border-secondary/70' : ''}`}
                                            onClick={() => {
                                                setNewImage(image.urls.regular);
                                            }}>
                                            <Image
                                                src={image.urls.regular}
                                                alt={`Image ${index + 1}`}
                                                width={400}
                                                height={240}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='flex flex-col items-center mt-2'>
                                {
                                    loadingMoreImages ?
                                        <button className='btn btn-sm loading'>Loading More...</button>
                                        :
                                        <button
                                            onClick={() => {
                                                setLoadingMoreImages(true);
                                                setPage(prev => prev + 1)
                                            }}
                                            className='btn btn-sm btn-outline btn-primary mt-4 w-32'
                                        >
                                            Load More</button>
                                }

                                <button onClick={() => setSettingNewImage(false)} className='btn btn-sm btn-outline btn-accent mt-2 w-32'>Cancel</button>
                            </div>
                        </div>
                        :
                        <>
                            {
                                originalImage ?
                                    <Image
                                        src={originalImage}
                                        alt='region image'
                                        width={400}
                                        height={240}
                                    ></Image>
                                    :
                                    <p>Loading original image ...</p>
                            }
                            <button onClick={() => setSettingNewImage(true)} className='btn btn-sm mt-6'>Use Another Image</button>
                        </>

                }

                {
                    error && <ErrorAlert error={error} setError={setError} />
                }
            </div>

        </div>
    );
};

export default UpdateImage;