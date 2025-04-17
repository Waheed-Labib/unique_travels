import { ReactElement } from "react"
import { cn } from "../lib/utils"

export default function Section({ children, className, isMarginShort }: {
    children: ReactElement | ReactElement[],
    className?: string,
    isMarginShort?: boolean
}) {
    return (
        <div
            className={cn(`mt-12 lg:mt-24 flex flex-col items-center px-8 md:px-12 ${className}`, isMarginShort ? 'mt-8 lg:mt-12' : "")}>
            {children}
        </div>
    )
}

