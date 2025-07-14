'use client'

import React, { useState } from 'react';
import DashboardHeading from '../../../dashboardHeading';
import AddCountries from './addCountries';
import AddDetails from './addDetails';

const Page = () => {

    const [countries, setCountries] = useState<string[]>([]);
    const [packageDetails, setPackageDetails] = useState<{ [key: string]: string }>({});

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
        </div>
    );
};

export default Page;