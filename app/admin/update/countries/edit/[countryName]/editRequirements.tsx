import React from 'react';
import { FaPlus } from 'react-icons/fa';

const EditRequirements = ({ requirements }: {
    requirements: string[]
}) => {

    const handleAddInput = () => {

    }

    return (
        <div>
            <label className="label text-sm font-semibold text-primary">3. Visa Requirements</label>

            <div className=''>
                {
                    requirements.map((requirement, index) => <input
                        key={index}
                        type='text'
                        defaultValue={requirement}
                        className='w-full border border-secondary rounded px-8 py-4 mb-2'
                    ></input>)
                }

                <button
                    type='button'
                    onClick={handleAddInput}
                    className='mt-4 flex items-center justify-center gap-2 bg-primary/80 hover:bg-primary/90 rounded-sm text-sm text-base-100 px-2 py-1'>
                    <FaPlus></FaPlus>
                    <p>Add Field</p>
                </button>
            </div>
        </div>
    );
};

export default EditRequirements;