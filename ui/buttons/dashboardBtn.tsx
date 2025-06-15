import { ReactNode } from "react";

const DashboardBtn = ({ type, children }: {
    type: 'logout' | 'option'
    children: ReactNode
}) => {
    return (
        <button className={`btn btn-sm font-semibold w-56 ${type === 'logout' ? 'bg-red-700/90 hover:bg-red-700 text-base-100 rounded-sm' : ''} ${type === 'option' ? 'bg-base-100 border-base-300 hover:bg-base-200 text-neutral shadow-sm shadow-neutral' : ''}`}>
            {children}
        </button>
    );
};

export default DashboardBtn;