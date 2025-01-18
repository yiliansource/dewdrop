import { useDrag } from "@use-gesture/react";
import { motion, useSpring } from "motion/react";
import { useEffect, useState } from "react";

import { useAppStore } from "./app-state";
import { TaskList } from "./task-list";

export function DewdropApp() {
    const state = useAppStore();
    const [currentListIndex, setCurrentListIndex] = useState(0);

    const tabWidth = Math.min(window.innerWidth, 672);

    const listOffsetX = useSpring(0, { stiffness: 200, damping: 30 });
    const bindSwipe = useDrag(
        ({ down, movement: [mx] }) => {
            if (down) {
                listOffsetX.set(-currentListIndex * tabWidth + mx);
            } else {
                if (Math.abs(mx) >= 30) {
                    const newListIndex = Math.max(
                        0,
                        Math.min(state.lists.length - 1, currentListIndex - Math.sign(mx)),
                    );
                    listOffsetX.set(-newListIndex * tabWidth);
                    setCurrentListIndex(newListIndex);
                } else {
                    listOffsetX.set(-currentListIndex * tabWidth);
                }
            }
        },
        { enabled: window.innerWidth <= 672 },
    );

    useEffect(() => {
        const handleKeypress = (e: KeyboardEvent) => {
            let newListIndex = currentListIndex;
            if (e.key === "ArrowRight" && currentListIndex + 1 < state.lists.length) {
                newListIndex++;
            }
            if (e.key === "ArrowLeft" && currentListIndex - 1 >= 0) {
                newListIndex--;
            }

            if (newListIndex !== currentListIndex) {
                listOffsetX.set(-newListIndex * tabWidth);
                setCurrentListIndex(newListIndex);
            }
        };

        window.addEventListener("keydown", handleKeypress);

        return () => {
            window.removeEventListener("keydown", handleKeypress);
        };
    });

    return (
        <motion.div className="relative mx-auto max-w-2xl h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="h-full touch-none" {...bindSwipe()}>
                <motion.div className="absolute flex flex-row left-0" style={{ x: listOffsetX }}>
                    {state.lists.map((list, listIndex) => (
                        <motion.div
                            key={list.id}
                            className="p-4 flex-1 w-screen max-w-2xl"
                            animate={{ opacity: listIndex === currentListIndex ? 1 : 0.5 }}
                        >
                            <TaskList listId={list.id} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
}
