'use client'

import React from 'react';
import { UnsplashImage } from '../../../../../../lib/types';
import CountryImage from '../../countryImage';

const AddCountryImage = ({ images, selectedImage, setSelectedImage }: {
    images: UnsplashImage[],
    selectedImage: UnsplashImage | null,
    setSelectedImage: React.Dispatch<React.SetStateAction<UnsplashImage | null>>
}) => {

    return (
        <div>
            <label className="label text-sm font-semibold text-primary">2. Choose an Image</label>

            <div>
                {images.length ?
                    <div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                            {
                                images.map(image => <CountryImage
                                    key={image.id}
                                    image={image}
                                    selectedImage={selectedImage}
                                    setSelectedImage={setSelectedImage}
                                ></CountryImage>)
                            }
                        </div>

                    </div>
                    :
                    <div>
                        <p>Loading Images ...</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default AddCountryImage;