import { collection, query, where } from "firebase/firestore";
import { AnimatePresence } from "motion/react";
import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import { auth, db } from "../firebase/app";
import { todoConverterForUser } from "../firebase/converter";
import { TodoListEntry } from "../todo-list-entry";

export function TasksScreen() {
    const user = useAuthState(auth)[0]!;
    const todoConverter = useMemo(() => todoConverterForUser(user.uid), [user.uid]);

    const todosRef = collection(db, "todos").withConverter(todoConverter);
    const [value] = useCollection(query(todosRef, where("uid", "==", user.uid)));

    return (
        <div className="p-4 h-full flex flex-col">
            <div className="py-1 mb-4 flex justify-between">
                <div></div>
                <h1 className="text-xl font-bold">Tasks</h1>
                <div></div>
            </div>

            {value && (
                <div className="flex flex-col flex-1 gap-2 overflow-y-scroll">
                    <AnimatePresence mode="popLayout">
                        {value.docs
                            .map((doc) => doc.data())
                            .map((todo) => (
                                <TodoListEntry key={todo.id} todo={todo} />
                            ))}
                        <div className="basis-2 flex-shrink-0"></div>
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
