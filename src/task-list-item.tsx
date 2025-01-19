import { useAppStore } from "./app-state";

export function TaskListItem({ taskId }: { taskId: string }) {
    const item = useAppStore((state) => state.tasks.find((t) => t.id === taskId))!;

    if (!item) return null;

    return (
        <div className="p-3 bg-white rounded-xl shadow">
            <div className="flex flex-row gap-2">
                <div>
                    <div className="w-5 h-5 rounded-full border border-gray-500"></div>
                </div>
                <div>
                    <p>{item.description}</p>
                    {item.deadline && <p className="text-sm text-gray-500">{item.deadline.toDateString()}</p>}
                </div>
            </div>
        </div>
    );
}
