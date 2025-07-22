'use client'

import React from 'react';
import { UnsplashImage } from '../../../../../lib/types';
import RegionImage from '../regionImage';

const AddRegionImage = ({ images, setImages, selectedImage, setSelectedImage, setPage }: {
    images: UnsplashImage[],
    setImages: React.Dispatch<React.SetStateAction<UnsplashImage[]>>,
    selectedImage: UnsplashImage | null,
    setSelectedImage: React.Dispatch<React.SetStateAction<UnsplashImage | null>>,
    setPage: React.Dispatch<React.SetStateAction<number>>,
}) => {

    const scrollToImageSection = () => {
        const addImageSection = document.getElementById('add-image');

        if (addImageSection) {
            addImageSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const handleLoadMore = () => {
        setImages([]);
        setPage(prev => prev + 1);

        scrollToImageSection();
    }

    return (

        <div id='add-image'>
            <label className="label text-sm font-semibold text-primary">2. Choose an Image</label>

            <div>
                {images.length ?
                    <div className='flex flex-col gap-2 items-center'>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                            {
                                images.map(image => <RegionImage
                                    key={image.id}
                                    image={image}
                                    selectedImage={selectedImage}
                                    setSelectedImage={setSelectedImage}
                                ></RegionImage>)
                            }

                        </div>

                        <button onClick={handleLoadMore} className='btn btn-sm btn-outline btn-secondary mt-4 w-32'>Load More</button>
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

export default AddRegionImage;