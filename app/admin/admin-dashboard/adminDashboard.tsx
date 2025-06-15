import React, { useContext, useState } from 'react';
import DashboardBtn from '../../../ui/buttons/dashboardBtn';
import SuccessAlert from '../../../ui/modals/success-alert/SuccessAlert';
import ErrorAlert from '../../../ui/modals/error-alert/ErrorAlert';
import { AdminContext } from '../../../contexts/AdminContext';

const AdminDashboard = () => {

    const { setAdmin } = useContext(AdminContext);

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/logout', {
                method: 'POST',
                credentials: 'include',
            })

            if (res.ok) {
                setSuccess('Logout Successful');
                setAdmin(null);
                setLoading(false);
            } else {
                setError('Logout Failed');
                setLoading(false);
            }
        } catch (err) {
            console.error('Logout error:', err);
            setError('Logout Failed');
            setLoading(false);
        }
    }

    return <div className="text-neutral p-12 flex flex-col items-center gap-8">

        <p className='text-xl text-neutral/80 font-bold'>Admin Dashboard</p>

        <div className='border-y flex flex-col gap-4'>
            <DashboardBtn onClick={handleLogout} type='option'>Update Countries</DashboardBtn>
            <DashboardBtn onClick={handleLogout} type='option'>Update Packages</DashboardBtn>
            <DashboardBtn onClick={handleLogout} type='option'>Update Work-Abroad</DashboardBtn>
            <DashboardBtn onClick={handleLogout} type='option'>Update Contact</DashboardBtn>
        </div>

        {
            loading ?
                <DashboardBtn type='loading'></DashboardBtn>
                :
                <DashboardBtn type='logout' onClick={handleLogout}>Log Out</DashboardBtn>
        }

        {
            success && <SuccessAlert
                success={success}
                setSuccess={setSuccess}
            ></SuccessAlert>
        }

        {
            error && <ErrorAlert
                error={error}
                setError={setError}
            ></ErrorAlert>
        }

    </div >

};

export default AdminDashboard;