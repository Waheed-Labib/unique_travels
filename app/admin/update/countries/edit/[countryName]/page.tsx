'use client'

import React from 'react';
import DashboardHeading from '../../../../dashboardHeading';

const Page = ({
    params,
}: {
    params: Promise<{ countryName: string }>;
}) => {

    const { countryName } = React.use(params);

    return (
        <div>
            <div className='w-full flex justify-center'>
                <DashboardHeading>
                    Edit {countryName}
                </DashboardHeading>
            </div>


        </div>
    );
};

export default Page;