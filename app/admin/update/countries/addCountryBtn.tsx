import React from 'react';
import { FaPlus } from 'react-icons/fa';

const AddCountryBtn = () => {
    return (
        <button className='btn btn-primary glass bg-primary w-full lg:w-1/4'>
            <FaPlus></FaPlus>
            <p className=''>Add New Country</p>
        </button>
    );
};

export default AddCountryBtn;