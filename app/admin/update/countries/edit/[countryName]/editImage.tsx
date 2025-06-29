import Image from 'next/image';
import React from 'react';

const EditImage = ({ image }: {
    image: string
}) => {
    return (
        <div>
            <label className="label text-sm font-semibold text-primary">2. Country Image</label>

            <Image
                src={image}
                alt='country image'
                width={400}
                height={240}
            ></Image>

            <button className='btn btn-sm mt-6'>Use Another Image</button>
        </div>
    );
};

export default EditImage;