import { useAppStore } from "./app-state";

export function TaskListItem({ taskId }: { taskId: string }) {
    const item = useAppStore((state) => state.tasks.find((t) => t.id === taskId))!;

    if (!item) return null;

    return (
        <div>
            <input type="checkbox" checked={item.completed} />
            <p>{item.description}</p>
        </div>
    );
}
