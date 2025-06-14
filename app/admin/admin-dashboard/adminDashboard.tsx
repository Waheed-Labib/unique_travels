import React from 'react';
import DashboardBtn from '../../../ui/buttons/dashboardBtn';

const AdminDashboard = () => {

    return <div className="text-neutral p-8 flex flex-col items-center gap-8">

        <p>Dashboard</p>

        <DashboardBtn borderColor='' bgColor='red-700' hoverBgColor='red-800'>Log Out</DashboardBtn>

    </div >

};

export default AdminDashboard;