import { ReactNode } from "react";

const DashboardBtn = ({ type, children }: {
    type: 'logout' | 'option'
    children: ReactNode
}) => {
    return (
        <button className={`btn btn-sm font-medium w-32 ${type === 'logout' ? 'bg-red-700 hover:bg-red-800 text-base-100' : ''} ${type === 'option' ? 'bg-base-100 border-base-300 hover:bg-base-200 text-neutral' : ''}`}>
            {children}
        </button>
    );
};

export default DashboardBtn;