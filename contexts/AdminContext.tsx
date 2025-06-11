'use client'

import { createContext, ReactNode, useState } from "react";

type AdminContextType = {
    admin: null | object
}

export const AdminContext = createContext<AdminContextType>({ admin: null });

export const AdminProvider = ({ children }: { children: ReactNode }) => {
    const [admin, setAdmin] = useState(null);

    const checkToken = async () => {
        const res = await fetch('/api/verify-token', { credentials: "include" });
        const data = await res.json();

        if (data.admin) {
            setAdmin(data.admin)
        }
    }

    checkToken();

    return <AdminContext.Provider value={{ admin }}>
        {children}
    </AdminContext.Provider>
}