import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

import { Banner } from "./banner";
import { DewdropApp } from "./dewdrop-app";

export default function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 2000);
    });

    return (
        <main
            className="w-screen h-screen bg-fixed overflow-hidden touch-none"
            style={{
                backgroundImage:
                    "linear-gradient( 58.2deg,  rgba(40,91,212,0.73) -3%, rgba(171,53,163,0.45) 49.3%, rgba(255,204,112,0.37) 97.7% )",
            }}
        >
            <AnimatePresence mode="wait">
                {isLoading && (
                    <div key="banner" className="flex flex-col items-center justify-center w-full h-full">
                        <Banner />
                        <div className="h-32 sm:h-16"></div>
                    </div>
                )}
                {!isLoading && <DewdropApp key="app" />}
            </AnimatePresence>
        </main>
    );
}
