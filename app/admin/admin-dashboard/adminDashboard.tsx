import React, { useContext, useState } from 'react';
import DashboardBtn from '../../../ui/buttons/dashboardBtn';
import SuccessAlert from '../../../ui/modals/success-alert/SuccessAlert';
import ErrorAlert from '../../../ui/modals/error-alert/ErrorAlert';
import { AdminContext } from '../../../contexts/AdminContext';
import Link from 'next/link';

const AdminDashboard = () => {

    const { admin, setAdmin } = useContext(AdminContext);

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);

        try {
            const res = await fetch('/api/logout', {
                method: 'POST',
                credentials: 'include',
            })

            if (res.ok) {
                setSuccess('Logout Successful');
                setAdmin(null);

            } else {
                setError('Logout Failed');

            }
        } catch (err) {
            console.error('Logout error:', err);
            setError('Logout Failed');
        } finally {
            setLoading(false)
        }
    }

    return <div className="text-neutral p-12 flex flex-col items-center gap-8">

        <div className='flex flex-col items-center gap-1'>
            <p className='text-xl text-neutral/80 font-bold'>Admin Dashboard</p>
            <p className='text-xs'>{admin?.email}</p>
        </div>

        <div className='border-y flex flex-col gap-4'>

            <Link href='/admin/update/countries'>
                <DashboardBtn type='option'>Update Countries</DashboardBtn>
            </Link>

            <Link href='/admin/update/packages'>
                <DashboardBtn type='option'>Update Packages</DashboardBtn>
            </Link>

            <Link href='/admin/update/work-abroad'>
                <DashboardBtn type='option'>Update Work-Abroad</DashboardBtn>
            </Link>

            <div>
                <Link href='/admin/update/contact'>
                    <DashboardBtn type='option'>Update Contact</DashboardBtn>
                </Link>
            </div>

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