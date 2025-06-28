'use client'

import React from 'react';
import { UnsplashImage } from '../../../../../lib/types';
import Image from 'next/image';

const CountryImage = ({ image }: {
    image: UnsplashImage
}) => {

    return (
        <div>
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