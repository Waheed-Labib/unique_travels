import { MouseEventHandler, ReactNode } from "react";

const DashboardBtn = ({ onClick, type, children }: {
    onClick: MouseEventHandler<HTMLButtonElement>
    type: 'logout' | 'option'
    children: ReactNode
}) => {
    return (
        <button onClick={onClick} className={`btn btn-sm font-semibold w-56 ${type === 'logout' ? 'bg-red-700/90 hover:bg-red-700 text-base-100 rounded-sm' : ''} ${type === 'option' ? 'bg-base-100 border-base-300 hover:bg-base-200 text-neutral shadow-sm shadow-neutral' : ''}`}>
            {children}
        </button>
    );
};

export default DashboardBtn;