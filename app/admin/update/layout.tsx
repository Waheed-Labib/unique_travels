'use client'

import { useContext } from "react";
import { AdminContext } from "../../../contexts/AdminContext";
import AdminLogin from "../adminLogin";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

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
                <Link
                    className="flex items-center gap-2 mb-8 text-xs btn btn-xs w-48"
                    href={'/admin'}>
                    <FaArrowLeft></FaArrowLeft>
                    <p>Back to /admin page</p>
                </Link>
                {children}
            </div >
        )
    }
}