import clsx from "clsx";
import { HTMLMotionProps, motion } from "motion/react";
import { FaCheck } from "react-icons/fa";

export function TodoCheckbox({ checked, ...props }: HTMLMotionProps<"input">) {
    const variants = {
        checked: { scale: 1 },
        unchecked: { scale: 0 },
    };

    return (
        <motion.div className={clsx("w-5 h-5 rounded-md transition-all bg-black/10")} {...props}>
            <motion.div
                variants={variants}
                initial={false}
                animate={checked ? "checked" : "unchecked"}
                className="w-5 h-5 rounded-md0"
            >
                <div className="flex items-center justify-center h-full text-xs">
                    <FaCheck />
                </div>
            </motion.div>
        </motion.div>
    );
}
