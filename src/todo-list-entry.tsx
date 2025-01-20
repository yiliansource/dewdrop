import { SplitText } from "@cyriacbr/react-split-text";
import clsx from "clsx";
import { motion } from "motion/react";
import React from "react";

import { useDewdropStore } from "./dewdrop-store";
import { TodoCheckbox } from "./todo-checkbox";

export function TodoListEntry({ taskId }: { taskId: string }) {
    const item = useDewdropStore((state) => state.todos.find((t) => t.id === taskId))!;
    const setTodoCompleted = useDewdropStore((state) => state.setTodoCompleted);

    const handleComplete = (e: React.MouseEvent) => {
        e.preventDefault();
        setTodoCompleted(item.id, !item.completed);
    };

    if (!item) return null;

    return (
        <motion.div
            className={clsx(
                "relative rounded-xl bg-white/50 shadow-md overflow-hidden transition-opacity",
                item.completed && "opacity-50",
            )}
            exit={{ scale: 0, transition: { delay: 1.5 } }}
            layout
        >
            <div className="p-3 flex flex-row gap-3">
                <div className="relative">
                    <TodoCheckbox checked={item.completed} onClick={handleComplete} />
                </div>
                <div>
                    {/* @ts-expect-error SplitText is typed incorrectly */}
                    <SplitText>{item.description}</SplitText>
                    {item.deadline && <p className="text-sm text-gray-500">{item.deadline.toDateString()}</p>}
                </div>
            </div>
        </motion.div>
    );
}
