import { ReactNode } from "react"
import * as motion from "motion/react-client"

export default function PrimaryBtn({ children, className }: {
    children: ReactNode,
    className?: string
}) {
    return (
        <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`btn btn-primary glass bg-primary ${className}`}>
            {children}
        </motion.button>
    )
}