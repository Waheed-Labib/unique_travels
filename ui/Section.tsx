import { ReactElement } from "react"


export default function Section({ children, className }: {
    children: ReactElement | ReactElement[],
    className?: string
}) {
    return (
        <div className={`mt-12 lg:mt-24 flex flex-col items-center px-8 md:px-12 ${className}`}>
            {children}
        </div>
    )
}