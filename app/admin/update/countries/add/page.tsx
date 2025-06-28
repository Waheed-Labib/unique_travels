'use client'

import React, { FormEvent, useState } from 'react';
import DashboardHeading from '../../../dashboardHeading';
import ErrorAlert from '../../../../../ui/modals/error-alert/ErrorAlert';

const Page = () => {

    const [name, setName] = useState('');
    const [nameSubmitted, setNameSubmitted] = useState(false);

    const [error, setError] = useState('');

    const handleNameSubmit = async (e: FormEvent) => {

        e.preventDefault();

        try {

            const res = await fetch('/api/check-country-exist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    countryName: name
                })
            });

            const data = await res.json();

            if (data.data.countryExists) {
                setError('Country Already Exists')
            }

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            }
            else {
                setError('Something Went Wrong')
            }
        }

    }

    const handleAddCountry = () => {

    }

    return (
        <div className='flex flex-col gap-8 items-center'>
            <DashboardHeading>
                Add New Country
            </DashboardHeading>

            <form onSubmit={handleAddCountry} className="mt-8 text-neutral">
                <label className="label text-sm font-semibold text-primary">Country Name</label>
                <input onChange={(e) => setName(e.target.value)} name='name' type="text" placeholder='country name' className="input w-64 border-base-200" />
                {
                    !nameSubmitted ?
                        <>
                            {
                                name ?
                                    <button onClick={handleNameSubmit} className="btn bg-neutral/90 text-white hover:bg-neutral/95 mt-4 block w-64">Submit</button>
                                    :
                                    <button disabled className="btn bg-neutral/80 text-white mt-4 block w-64">Submit</button>
                            }
                        </>
                        :
                        <>

                        </>
                }
            </form>
            {
                error && <ErrorAlert
                    error={error}
                    setError={setError}
                ></ErrorAlert>
            }
        </div>
    );
};

export default Page;