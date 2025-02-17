import { outfit } from "../app/layout"
import * as motion from "motion/react-client"

export default function Header({ smallText, largeText, sequence }: {
    smallText: string,
    largeText: string,
    sequence: 'small, large' | 'large, small'
}) {

    const smallTextNode = <>{smallText}</>
    const largeTextNode = <span className={`text-xl md:text-2xl lg:text-4xl font-semibold underline decoration-wavy decoration-primary`}>
        {largeText}
    </span>

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
            viewport={{ once: true }}>
            <h1 className={`text-neutral text-center font-medium md:text-lg lg:text-xl mb-12 lg:mb-16 ${outfit.className}`}>
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
        </motion.div >
    )
}