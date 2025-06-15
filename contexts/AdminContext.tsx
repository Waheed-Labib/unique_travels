'use client'

import { createContext, ReactNode, useState } from 'react'

type AdminContextType = {
    admin: null | object
    setAdmin: React.Dispatch<React.SetStateAction<null | object>>
}

export const AdminContext = createContext<AdminContextType>({
    admin: null,
    setAdmin: () => { },
})

export const AdminProvider = ({ children }: { children: ReactNode }) => {
    const [admin, setAdmin] = useState<null | object>(null)

    const checkToken = async () => {
        const res = await fetch('/api/(admin)/check-auth', {
            credentials: 'include',
        })
        const data = await res.json()
        if (data.admin) {
            setAdmin(data.admin)
        }
    }

    checkToken()

    return (
        <AdminContext.Provider value={{ admin, setAdmin }}>
            {children}
        </AdminContext.Provider>
    )
}
