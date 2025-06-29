import React from 'react';
import { UnsplashImage } from '../../../../lib/types';
import Image from 'next/image';

const CountryImage = ({ image, selectedImage, setSelectedImage }: {
    image: UnsplashImage,
    selectedImage: UnsplashImage | null,
    setSelectedImage: React.Dispatch<React.SetStateAction<UnsplashImage | null>>
}) => {
    return (
        <div onClick={() => setSelectedImage(image)} className={`p-8 rounded border border-base-100 hover:bg-secondary/40 hover:border-secondary/60 transition-all ${selectedImage === image ? 'bg-secondary/50 border-secondary/70' : ''}`}>
            <Image
                alt='country image'
                src={image.urls.regular}
                width={1000}
                height={600}
            ></Image>
        </div>
    );
};

export default CountryImage;