'use client'

import { useContext } from "react";
import AdminDashboard from "./admin-dashboard/adminDashboard";
import AdminLogin from "./adminLogin";
import { AdminContext } from "../../contexts/AdminContext";

export default function Page() {

    const { admin } = useContext(AdminContext);

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
