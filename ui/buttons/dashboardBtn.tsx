import { ReactNode } from "react";

const DashboardBtn = ({ borderColor, bgColor, hoverBgColor, children }: {
    borderColor: 'neutral' | ''
    bgColor: 'base-100' | 'red-700',
    hoverBgColor: 'base-200' | 'red-800'
    children: ReactNode
}) => {
    return (
        <button className={`btn btn-sm text-base-100 bg-${bgColor} border-${borderColor} font-medium w-32 hover:bg-${hoverBgColor}`}>
            {children}
        </button>
    );
};

export default DashboardBtn;