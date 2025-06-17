'use client'

import { createContext, ReactNode, useEffect, useState } from 'react'
import { Admin } from '../lib/types'

type AdminContextType = {
    admin: null | Admin
    setAdmin: React.Dispatch<React.SetStateAction<null | Admin>>
    loading: boolean
}

export const AdminContext = createContext<AdminContextType>({
    admin: null,
    setAdmin: () => { },
    loading: true
})

export const AdminProvider = ({ children }: { children: ReactNode }) => {
    const [admin, setAdmin] = useState<null | Admin>(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const checkToken = async () => {
            try {
                const res = await fetch('/api/verify-token', {
                    credentials: 'include',
                })

                const data = await res.json();

                if (data.data) {
                    setAdmin(data.data)
                }
            } catch (err) {
                console.error('checking token failed', err)
            }
            finally {
                setLoading(false)
            }
        }

        checkToken()
    }, [])

    return (
        <AdminContext.Provider value={{ admin, setAdmin, loading }}>
            {children}
        </AdminContext.Provider>
    )
}
