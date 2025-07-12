import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { UnsplashImage } from '../../../../../../lib/types';
import ErrorAlert from '../../../../../../ui/modals/error-alert/ErrorAlert';
import CountryImage from '../../countryImage';

const unsplashClientId = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID;

const EditImage = ({ countryName, image, selectedImage, setSelectedImage }: {
    countryName: string,
    image: string,
    selectedImage: UnsplashImage | null,
    setSelectedImage: React.Dispatch<React.SetStateAction<UnsplashImage | null>>,

}) => {

    const [imageOptions, setImageOptions] = useState<UnsplashImage[] | null>(null)
    const [imageOptionsShowing, setImageOptionsShowing] = useState(false);

    const [error, setError] = useState('');

    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch(`https://api.unsplash.com/search/photos/?client_id=${unsplashClientId}&query=${countryName}&page=${page}&orientation=landscape`)
            .then(res => res.json())
            .then(data => {
                setImageOptions(data.results)
            })
            .catch(error => {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Something Went Wrong while Fetching Images');
                }
            })
    }, [countryName, page]);

    const scrollToImageSection = () => {
        const editImageSection = document.getElementById('edit-image');

        if (editImageSection) {
            editImageSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const handleUseAnotherImage = () => {
        setImageOptionsShowing(true);
        setSelectedImage(null);

        scrollToImageSection();
    }

    const handleLoadMore = () => {
        setPage(prev => prev + 1);

        scrollToImageSection();
    }

    const handleCancelImageChange = () => {
        setImageOptionsShowing(false);
        setSelectedImage(null);
        setPage(1);

        scrollToImageSection();
    }

    return (
        < div id='edit-image'>
            <label className="label text-sm font-semibold text-primary">2. Country Image</label>

            {
                imageOptionsShowing ?
                    <div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                            {
                                imageOptions?.map(image => <CountryImage
                                    key={image.id}
                                    image={image}
                                    selectedImage={selectedImage}
                                    setSelectedImage={setSelectedImage}

                                ></CountryImage>)
                            }
                        </div>

                        <div className='w-full flex flex-col gap-1 items-center'>
                            <button onClick={handleLoadMore} className='btn btn-sm btn-outline btn-primary mt-4 w-32'>Load More</button>
                            <button onClick={handleCancelImageChange} className='btn btn-sm btn-outline btn-accent mt-2 w-32'>Cancel</button>
                        </div>

                    </div>
                    :
                    <div>
                        <Image
                            src={image}
                            alt='country image'
                            width={400}
                            height={240}
                        ></Image>

                        <button onClick={handleUseAnotherImage} className='btn btn-sm mt-6'>Use Another Image</button>
                    </div>
            }

            {
                error && <ErrorAlert error={error} setError={setError} />
            }
        </div >
    );
};

export default EditImage;