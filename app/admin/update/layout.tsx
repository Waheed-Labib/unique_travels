'use client'

import { useContext } from "react";
import { AdminContext } from "../../../contexts/AdminContext";
import AdminLogin from "../adminLogin";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { admin, loading } = useContext(AdminContext);

    if (loading) {
        return (
            <div>
                Loading ...
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
            <div className="w-full p-12">
                {children}
            </div >
        )
    }
}