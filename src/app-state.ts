import { produce } from "immer";
import ShortUniqueId from "short-unique-id";
import { create } from "zustand";

const uid = new ShortUniqueId({ length: 10 });

/**
 * Holds the overall state of the application.
 */
interface AppState {
    tasks: Task[];
    lists: TaskList[];
}

interface Task {
    id: string;
    completed: boolean;
    description: string;
    deadline?: Date;
}

interface TaskList {
    id: string;
    name: string;
    tasks: string[];
}

const sampleUids = Array.from(Array(5), () => uid.rnd());

export const useAppStore = create<AppState>((set) => ({
    tasks: [
        {
            id: sampleUids[0],
            completed: true,
            description: "Distribution Theory Exercises",
            deadline: new Date(2025, 0, 11),
        },
        {
            id: sampleUids[1],
            completed: false,
            description: "Distribution Theory Exercises",
            deadline: new Date(2025, 0, 17),
        },
        {
            id: sampleUids[2],
            completed: false,
            description: "Functional Analysis II Excerises",
            deadline: new Date(2025, 0, 20),
        },
        {
            id: sampleUids[3],
            completed: true,
            description: "Drink Water",
            deadline: new Date(2025, 0, 11),
        },
    ],
    lists: [
        {
            id: uid.rnd(),
            name: "University",
            tasks: sampleUids.slice(0, 3),
        },
        {
            id: uid.rnd(),
            name: "Private",
            tasks: [sampleUids[3]],
        },
    ],

    createTaskList: (name: string) =>
        set(
            produce<AppState>((state) => {
                state.lists.push({
                    id: uid.rnd(),
                    name,
                    tasks: [],
                });
            }),
        ),
    deleteTaskList: (listId: string) =>
        set(
            produce<AppState>((state) => {
                const listIndex = state.lists.findIndex((l) => l.id === listId);
                if (listIndex < 0) return;

                state.lists.splice(listIndex, 1);
            }),
        ),

    createTask: (listId: string, description: string, deadline?: Date) =>
        set(
            produce<AppState>((state) => {
                const list = state.lists.find((l) => l.id === listId);
                if (!list) return;

                const task: Task = {
                    id: uid.rnd(),
                    completed: false,
                    description,
                    deadline,
                };

                state.tasks.push(task);
                list.tasks.push(task.id);
            }),
        ),
    updateTask: (taskId: string, delta: Partial<Omit<Task, "id">>) =>
        set(
            produce<AppState>((state) => {
                const task = state.tasks.find((t) => t.id === taskId);
                if (!task) return;

                Object.assign(task, delta);
            }),
        ),
    // deleteTask: (listId: string, taskId: string) =>
    //     set(
    //         produce<AppState>((state) => {
    //             const list = state.lists.find((l) => l.id === listId);
    //             if (!list) return;

    //             const taskIndex = list.tasks.findIndex((t) => t.id === taskId);
    //             if (taskIndex < 0) return;

    //             list.tasks.splice(taskIndex, 1);
    //         }),
    //     ),
}));
