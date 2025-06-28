import React, { ReactNode } from 'react';

const DashboardHeading = ({ children }: {
    children: ReactNode
}) => {
    return (
        <p className='text-xl font-semibold text-neutral/90'>{children}</p>
    );
};

export default DashboardHeading;