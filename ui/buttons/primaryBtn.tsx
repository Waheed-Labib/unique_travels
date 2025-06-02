'use client'

import { MouseEventHandler, ReactNode } from "react"
import * as motion from "motion/react-client"

export default function PrimaryBtn({ type, children, className, handler }: {
    type?: "button" | "submit" | "reset" | undefined
    children: ReactNode,
    className?: string,
    handler?: MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <motion.button
            type={type}
            onClick={handler}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`btn btn-primary glass bg-primary ${className}`}>
            {children}
        </motion.button>
    )
}