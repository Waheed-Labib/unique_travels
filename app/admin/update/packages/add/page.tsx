'use client'

import React, { useState } from 'react';
import DashboardHeading from '../../../dashboardHeading';
import AddCountries from './addCountries';
import AddDetails from './addDetails';
import AddCode from './addCode';
import ErrorAlert from '../../../../../ui/modals/error-alert/ErrorAlert';
import SuccessAlert from '../../../../../ui/modals/success-alert/SuccessAlert';
import { pkg } from '../../../../../lib/types';

const Page = () => {

    const [countries, setCountries] = useState<string[]>([]);
    const [packageDetails, setPackageDetails] = useState<{ [key: string]: string }>({});
    const [code, setCode] = useState<number | ''>('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formSubmitting, setFormSubmitting] = useState(false);

    const handleAddPackage = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setFormSubmitting(true);

        fetch('/api/packages')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const existingCode = data.data.find((pkg: pkg) => pkg.code === code);
                    if (existingCode) {
                        setError(`The Code ${code} is already used.`);
                        setFormSubmitting(false);
                        return;
                    }

                    fetch('/api/packages', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            countries,
                            details: packageDetails,
                            code
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.success) {
                                setSuccess('Package added successfully!');
                                setCountries([]);
                                setPackageDetails({});
                                setCode('');
                            } else {
                                setError(data.message || 'Failed to add package');
                            }
                        })
                        .catch(error => {
                            if (error instanceof Error) {
                                setError(error.message);
                            } else {
                                setError('Failed to Add Package');
                            }
                        })
                        .finally(() => {
                            setFormSubmitting(false);
                        });
                } else {
                    setError(data.message || 'Failed to check data');
                }
            })
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

            <AddCode
                code={code}
                setCode={setCode}
            ></AddCode>

            {
                countries && packageDetails && Object.keys(packageDetails).length > 0 && (code !== '' && /^\d{3}$/.test(String(code))) ?
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

            {
                error && <ErrorAlert error={error} setError={setError} />
            }

            {
                success && <SuccessAlert success={success} setSuccess={setSuccess} />
            }
        </div>
    );
};

export default Page;