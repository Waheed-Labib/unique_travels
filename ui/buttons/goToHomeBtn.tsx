import * as motion from "motion/react-client"
import { FaHome } from "react-icons/fa";

const GoToHomeBtn = () => {
    return (
        <motion.div
            whileHover={{ scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-4 cursor-pointer"
        >
            <p>Go to Home</p>
            <div className="rounded-full bg-neutral p-2 text-base-100 text-xl">
                <FaHome></FaHome>
            </div>
        </motion.div>
    );
};

export default GoToHomeBtn;