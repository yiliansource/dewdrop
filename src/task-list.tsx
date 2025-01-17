import { useAppStore } from "./app-state";
import { TaskListItem } from "./task-list-item";

export function TaskList({ listId }: { listId: string }) {
    const items = useAppStore((state) => state.lists.find((l) => l.id === listId))!;

    return (
        <div>
            {items.tasks.map((t) => (
                <TaskListItem key={t.id} listId={listId} taskId={t.id} />
            ))}
        </div>
    );
}
