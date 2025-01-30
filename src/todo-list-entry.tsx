import clsx from "clsx";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { motion } from "motion/react";
import { forwardRef, useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { HiTrash } from "react-icons/hi";

import { TodoData } from "./dewdrop-types";
import { auth, db } from "./firebase/app";
import { todoConverterForUser } from "./firebase/converter";
import { TodoCheckbox } from "./todo-checkbox";

export const TodoListEntry = forwardRef<HTMLDivElement, { todo: TodoData }>(({ todo }, ref) => {
    const user = useAuthState(auth)[0]!;
    const todoConverter = useMemo(() => todoConverterForUser(user.uid), [user.uid]);

    const handleComplete = () => {
        console.log("complete", todo.id);
        updateDoc(doc(db, "todos", todo.id).withConverter(todoConverter), {
            completed: !todo.completed,
        });
    };
    const handleDelete = () => {
        deleteDoc(doc(db, "todos", todo.id));
    };

    return (
        <motion.div
            className={clsx(
                "flex-shrink-0 p-3 rounded-xl bg-white overflow-hidden transition-opacity",
                todo.completed ? "opacity-50" : "",
            )}
            exit={{ scale: 0.8, opacity: 0 }}
            layout
            ref={ref}
        >
            <div className="flex flex-row gap-2 items-center">
                <div onClick={handleComplete}>
                    <TodoCheckbox checked={todo.completed} />
                </div>
                <div className="flex-grow">
                    <p>{todo.description}</p>
                </div>
                <div className="flex flex-row items-center">
                    <div className="text-gray-300" onClick={handleDelete}>
                        <HiTrash />
                    </div>
                </div>
            </div>
        </motion.div>
    );
});
