import { ReactNode } from "react"

export default function PrimaryBtn({ children, className }: {
    children: ReactNode,
    className?: string
}) {
    return (
        <button className={`btn btn-primary glass bg-primary ${className}`}>
            {children}
        </button>
    )
}