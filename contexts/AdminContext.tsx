'use client'

import { createContext, ReactNode, useState } from "react";

type AdminContextType = {
    isLoggedIn: boolean
}

const AdminContext = createContext<AdminContextType>({ isLoggedIn: false });

export const AdminProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkToken = async () => {
        const res = await fetch('/api/verify-token', { credentials: "include" });
        const data = await res.json();

        if (data.admin) {
            setIsLoggedIn(true)
        }
    }

    checkToken();

    return <AdminContext.Provider value={{ isLoggedIn }}>
        {children}
    </AdminContext.Provider>
}