import { AnimatePresence } from "motion/react";
import { useShallow } from "zustand/shallow";

import { useDewdropStore } from "./app-state";
import { NewTodoListEntry } from "./new-todo-list-entry";
import { TodoListEntry } from "./todo-list-entry";

export function TodoList({ listId }: { listId: string }) {
    const { todos, lists } = useDewdropStore(useShallow((state) => ({ todos: state.todos, lists: state.lists })));

    const list = lists.find((l) => l.id === listId)!;
    const todosInList = todos.filter((t) => list.todos.includes(t.id));

    return (
        <div>
            <h2 className="mt-6 mb-8 text-center text-4xl drop-shadow font-bold">{list.name}</h2>
            <div className="flex flex-col gap-2">
                <AnimatePresence>
                    {todosInList
                        .filter((t) => !t.completed)
                        .map((t) => (
                            <TodoListEntry key={t.id} taskId={t.id} />
                        ))}
                    {todosInList
                        .filter((t) => t.completed)
                        .map((t) => (
                            <TodoListEntry key={t.id} taskId={t.id} />
                        ))}
                    <NewTodoListEntry key="NEW" />
                </AnimatePresence>
            </div>
        </div>
    );
}
