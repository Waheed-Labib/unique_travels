import Image from 'next/image';
import React, { useState } from 'react';
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
    const [error, setError] = useState('');

    const handleUseAnotherImage = () => {
        fetch(`https://api.unsplash.com/search/photos/?client_id=${unsplashClientId}&query=${countryName}&page=1&orientation=landscape`)
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
    }

    return (
        < div >
            <label className="label text-sm font-semibold text-primary">2. Country Image</label>

            {
                imageOptions ?
                    <div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                            {
                                imageOptions.map(image => <CountryImage
                                    key={image.id}
                                    image={image}
                                    selectedImage={selectedImage}
                                    setSelectedImage={setSelectedImage}

                                ></CountryImage>)
                            }
                        </div>


                        <button onClick={() => setImageOptions(null)} className='btn btn-sm btn-accent'>Cancel</button>

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