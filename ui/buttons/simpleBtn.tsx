import { ReactElement } from "react"
import { cn } from "../../lib/utils"

export default function SimpleBtn({ children, addOutline }: {
    children: ReactElement | ReactElement[],
    addOutline: boolean
}) {
    return (
        <button className={cn(`btn btn-xs text-base-200 border-dotted group-hover:border-solid`,
            addOutline === true ? 'btn-outline border-base-200 group-hover: bg-neutral' : 'btn-ghost group-hover:bg-neutral/90'
        )}>
            {children}
        </button>
    )
}
