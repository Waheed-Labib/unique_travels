import Image from 'next/image';
import React from 'react';

const UpdateImage = ({ originalImage }: {
    originalImage: string | undefined;
}) => {

    const handleUseAnotherImage = () => {

    };

    return (
        <div>
            <label className="label font-semibold text-primary">1. Update Image</label>

            <div>
                {
                    originalImage &&
                    <Image
                        src={originalImage}
                        alt='region image'
                        width={400}
                        height={240}
                    ></Image>
                }
                <button onClick={handleUseAnotherImage} className='btn btn-sm mt-6'>Use Another Image</button>
            </div>

        </div>
    );
};

export default UpdateImage;