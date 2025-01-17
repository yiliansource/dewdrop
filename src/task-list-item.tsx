import { useAppStore } from "./app-state";

export function TaskListItem({ listId, taskId }: { listId: string; taskId: string }) {
    const item = useAppStore((state) => state.lists.find((l) => l.id === listId)!.tasks.find((t) => t.id === taskId))!;

    if (!item) return null;

    return (
        <div>
            <input type="checkbox" checked={item.completed} />
            <p>{item.description}</p>
        </div>
    );
}
