import clsx from "clsx";
import { formatRelative } from "date-fns";
import { motion } from "motion/react";
import React from "react";

import { useDewdropStore } from "./dewdrop-store";
import SplitParagraph from "./split-paragraph";
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
                <div className="relative flex-1">
                    <SplitParagraph
                        className="mb-1 flex flex-col"
                        lineFactory={(line, index, lineCount) => (
                            <span key={index} className="relative mr-auto">
                                <span>{line}</span>
                                <motion.span
                                    className="absolute top-3 left-0 h-0.5 bg-black"
                                    variants={{
                                        completed: { width: "100%", transition: { delay: index * 0.2 } },
                                        incomplete: {
                                            width: "0%",
                                            transition: { delay: (lineCount - index - 1) * 0.2 },
                                        },
                                    }}
                                    transition={{ duration: 0.2 }}
                                    animate={item.completed ? "completed" : "incomplete"}
                                ></motion.span>
                            </span>
                        )}
                    >
                        {item.description}
                    </SplitParagraph>

                    {item.deadline && (
                        <p className="text-sm text-gray-500">{formatRelative(item.deadline, new Date())}</p>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
