'use client'

import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import AddCountryModal from './addCountryModal';

const AddCountryBtn = () => {

    const [addCountryModalOpen, setAddCountryModalOpen] = useState(false);

    return (
        <>
            <button onClick={() => setAddCountryModalOpen(true)} className='btn btn-primary glass bg-primary w-full lg:w-1/4'>
                <FaPlus></FaPlus>
                <p className=''>Add New Country</p>
            </button>
            {
                addCountryModalOpen ?
                    <AddCountryModal
                        addCountryModalOpen={addCountryModalOpen}
                        setAddCountryModalOpen={setAddCountryModalOpen}
                    ></AddCountryModal>
                    :
                    <></>
            }
        </>
    );
};

export default AddCountryBtn;