import { createContext } from "react";

type AdminContextType = {
    isLoggedIn: boolean
}

const AdminContext = createContext<AdminContextType>({ isLoggedIn: false });