import { outfit } from "../app/layout"
import * as motion from "motion/react-client"

export default function Header({ smallText, largeText, sequence, isHome = true }: {
    smallText: string,
    largeText: string,
    sequence: 'small, large' | 'large, small',
    isHome?: boolean
}) {

    const smallTextNode = <>{smallText}</>
    const largeTextNode = <span className={`text-xl md:text-2xl lg:text-4xl font-semibold underline decoration-wavy decoration-primary`}>
        {largeText}
    </span>

    const element = <h1 className={`text-neutral text-center font-medium md:text-lg lg:text-xl mb-12 lg:mb-16 ${outfit.className}`}>
        {
            sequence === 'large, small' && <>
                {largeTextNode}
                {' '}
                {smallTextNode}
            </>
        }

        {
            sequence === 'small, large' && <>
                {smallTextNode}
                {' '}
                {largeTextNode}
            </>
        }
    </h1>

    if (isHome) return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
            viewport={{ once: true }}>
            {element}
        </motion.div >
    )

    if (!isHome) return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.2,
                scale: {
                    type: "spring",
                    stiffness: 40,
                    damping: 12,
                    bounce: 0.2,
                },
                opacity: { duration: 0.2 },
            }}>
            {element}
        </motion.div>
    )
}