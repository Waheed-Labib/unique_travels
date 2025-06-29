import React from 'react';
import DashboardHeading from '../../../../dashboardHeading';

const Page = async ({
    params,
}: {
    params: Promise<{ countryName: string }>;
}) => {

    const { countryName } = await params;

    return (
        <div className='flex flex-col items-center gap-8'>
            <DashboardHeading>
                Delete {countryName}?
            </DashboardHeading>
        </div>
    );
};

export default Page;