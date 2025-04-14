import { ReactElement } from "react"

export default function Section({ children, className, isMarginShort }: {
    children: ReactElement | ReactElement[],
    className?: string,
    isMarginShort?: boolean
}) {
    return (
        <div
            className={`mt-12 lg:mt-24 ${isMarginShort && 'mt-8 lg:mt-12'} flex flex-col items-center px-8 md:px-12 ${className}`}>
            {children}
        </div>
    )
}