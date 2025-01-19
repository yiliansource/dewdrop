import { motion } from "motion/react";

export function Banner() {
    return (
        <div className="relative select-none drop-shadow">
            <motion.svg
                className="absolute -right-12 -top-6 z-10 "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.6 } }}
                exit={{ opacity: 0 }}
                width={130}
                height={130}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <mask id="text-cover">
                    <rect x="0" y="0" width="100%" height="100%" fill="white" />
                    <circle cx="5.7" cy="11" r="4.2" fill="black" />
                    <rect x="3" y="14" width="7" height="5.3" fill="black" />
                </mask>
                <motion.path
                    d="M5 14C5 10.8745 7.15837 6.7764 10.9055 3.80403C11.5477 3.29457 12.4523 3.29457 13.0945 3.80403C16.8416 6.7764 19 10.8745 19 14C19 18.4183 15.4183 21 12 21C8.58172 21 5 18.4183 5 14Z"
                    className="stroke-[#f4f3f2] stroke-[1.2]"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    mask="url(#text-cover)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1, transition: { delay: 0.6, duration: 1, ease: "circInOut" } }}
                />
            </motion.svg>

            <div className="relative z-20 text-[#f4f3f2] text-center">
                <motion.h1
                    className="-mb-2 text-6xl font-bold"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
                    exit={{ opacity: 0 }}
                >
                    dewdrop
                </motion.h1>
                <motion.p
                    className="pr-3 text-xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
                    exit={{ opacity: 0 }}
                >
                    delightful todo lists
                </motion.p>
            </div>
        </div>
    );
}
