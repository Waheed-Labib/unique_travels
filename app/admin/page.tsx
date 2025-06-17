'use client'

import { useContext } from "react";
import AdminDashboard from "./admin-dashboard/adminDashboard";
import AdminLogin from "./adminLogin";
import { AdminContext } from "../../contexts/AdminContext";

export default function Page() {

    const { admin, loading } = useContext(AdminContext);

    console.log('admin', admin)
    console.log('loading', loading)

    if (loading) {
        return (
            <div className="pt-12">
                Checking Login Status ...
            </div>
        )
    }

    if (!admin) {
        return (
            <div>
                <AdminLogin></AdminLogin>
            </div>
        )
    }

    else {
        return (
            <div className="w-full">
                <AdminDashboard></AdminDashboard>
            </div >
        )
    }

}
