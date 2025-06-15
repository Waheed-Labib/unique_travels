import React from 'react';
import DashboardBtn from '../../../ui/buttons/dashboardBtn';

const AdminDashboard = () => {

    return <div className="text-neutral p-12 flex flex-col items-center gap-8">

        <p className='text-xl text-neutral/80 font-bold'>Admin Dashboard</p>

        <div className='border-y flex flex-col gap-4'>
            <DashboardBtn type='option'>Update Countries</DashboardBtn>
            <DashboardBtn type='option'>Update Packages</DashboardBtn>
            <DashboardBtn type='option'>Update Work-Abroad</DashboardBtn>
            <DashboardBtn type='option'>Update Contact</DashboardBtn>
        </div>

        <DashboardBtn type='logout'>Log Out</DashboardBtn>

    </div >

};

export default AdminDashboard;