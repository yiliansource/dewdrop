/// <reference types="vite-plugin-svgr/client" />
import clsx from "clsx";
import { HTMLMotionProps, motion } from "motion/react";

import CheckmarkSvg from "./assets/checkmark.svg?react";

export function TodoCheckbox({ checked, ...props }: HTMLMotionProps<"input">) {
    const variants = {
        checked: { scale: 1 },
        unchecked: { scale: 0 },
    };

    return (
        <motion.div className={clsx("w-5 h-5 rounded-md transition-all bg-black/10")} {...props}>
            <input type="checkbox" id="react-option" value="" className="hidden peer" />
            <label htmlFor="react-option" className="h-5 w-5 rounded-md cursor-pointer">
                <motion.div
                    variants={variants}
                    initial={false}
                    animate={checked ? "checked" : "unchecked"}
                    className="w-5 h-5 rounded-md bg-black/10"
                >
                    <CheckmarkSvg className="p-1 w-full h-full" />
                </motion.div>
            </label>
        </motion.div>
    );
}
