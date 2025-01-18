import { useAppStore } from "./app-state";

export function TaskListItem({ taskId }: { taskId: string }) {
    const item = useAppStore((state) => state.tasks.find((t) => t.id === taskId))!;

    if (!item) return null;

    return (
        <div className="p-3 bg-white rounded-xl shadow">
            <div className="flex flex-row gap-2">
                <div>
                    <div className="w-6 h-6 rounded-full border border-gray-500"></div>
                </div>
                <div>
                    <p>{item.description}</p>
                    {item.deadline && <p>{item.deadline.toDateString()}</p>}
                </div>
            </div>
        </div>
    );
}
