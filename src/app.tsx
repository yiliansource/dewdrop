import { motion } from "motion/react";

export default function App() {
    return (
        <>
            {/* <header className="flex py-8"></header>
            <main></main>
            <footer></footer> */}

            <main
                className="flex flex-col w-screen h-screen"
                style={{
                    backgroundImage:
                        "linear-gradient( 58.2deg,  rgba(40,91,212,0.73) -3%, rgba(171,53,163,0.45) 49.3%, rgba(255,204,112,0.37) 97.7% )",
                }}
            >
                <div className="m-auto pb-12 relative select-none">
                    <motion.svg
                        className="absolute -right-12 -top-6 z-10 drop-shadow"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.8 } }}
                        width={130}
                        height={130}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <mask id="text-cover">
                            <rect x="0" y="0" width="100%" height="100%" fill="white" />
                            <circle cx="5.7" cy="11" r="4.2" fill="black" />
                            <rect x="3" y="14" width="7" height="5" fill="black" />
                        </mask>
                        <path
                            d="M5 14C5 10.8745 7.15837 6.7764 10.9055 3.80403C11.5477 3.29457 12.4523 3.29457 13.0945 3.80403C16.8416 6.7764 19 10.8745 19 14C19 18.4183 15.4183 21 12 21C8.58172 21 5 18.4183 5 14Z"
                            className="stroke-blue-50 stroke-[1.2]"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            mask="url(#text-cover)"
                        />
                    </motion.svg>

                    <div className="relative z-20 text-white text-center drop-shadow">
                        <motion.h1
                            className="-mb-2 text-6xl font-bold"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { delay: 0.4 } }}
                        >
                            dewdrop
                        </motion.h1>
                        <motion.p
                            className="pr-3 text-xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { delay: 0.6 } }}
                        >
                            delightful todo lists
                        </motion.p>
                    </div>
                </div>
            </main>
        </>
    );
}
