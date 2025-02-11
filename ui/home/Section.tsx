import { ReactElement } from "react"


export default function Section({ children }: {
    children: ReactElement | ReactElement[]
}) {
    return (
        <div className="mt-12 lg:mt-24 flex flex-col items-center px-12">
            {children}
        </div>
    )
}