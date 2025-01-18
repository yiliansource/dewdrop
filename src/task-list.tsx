import { useAppStore } from "./app-state";
import { TaskListItem } from "./task-list-item";

export function TaskList({ listId }: { listId: string }) {
    const list = useAppStore((state) => state.lists.find((l) => l.id === listId))!;

    return (
        <div>
            <h2 className="mt-4 mb-6 text-center text-2xl font-bold">{list.name}</h2>
            <div className="flex flex-col gap-2">
                {list.tasks.map((t) => (
                    <TaskListItem key={t} taskId={t} />
                ))}
            </div>
        </div>
    );
}
