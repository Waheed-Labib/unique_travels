'use client'

import React, { useState } from 'react';
import DashboardHeading from '../../../dashboardHeading';
import AddCountries from './addCountries';

const Page = () => {

    const [countries, setCountries] = useState<string[]>([]);

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
        </div>
    );
};

export default Page;