'use client'

import React, { useState } from 'react';
import DashboardHeading from '../../../dashboardHeading';
import AddCountries from './addCountries';
import AddDetails from './addDetails';

const Page = () => {

    const [countries, setCountries] = useState<string[]>([]);
    const [packageDetails, setPackageDetails] = useState<{ [key: string]: string }>({});

    const [formSubmitting, setFormSubmitting] = useState(false);

    const handleAddPackage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormSubmitting(true);
    }

    return (
        <div>
            <DashboardHeading>
                Add New Package
            </DashboardHeading>

            {/* countries, details, code */}
            <AddCountries
                countries={countries}
                setCountries={setCountries}
            ></AddCountries>

            <AddDetails
                packageDetails={packageDetails}
                setPackageDetails={setPackageDetails}
            ></AddDetails>

            {
                countries && packageDetails && Object.keys(packageDetails).length > 0 ?
                    <>
                        {
                            formSubmitting ?
                                <button
                                    disabled
                                    className="btn bg-neutral/80 text-white mt-4 block w-64"
                                >
                                    Loading ...
                                </button>
                                :
                                <button
                                    onClick={handleAddPackage}
                                    className="btn bg-neutral/90 text-white hover:bg-neutral/95 mt-4 block w-64"
                                >
                                    Submit
                                </button>
                        }
                    </>
                    :
                    < button
                        disabled
                        className="btn bg-neutral/80 text-white mt-4 block w-64"
                    >
                        Submit
                    </button>

            }
        </div>
    );
};

export default Page;