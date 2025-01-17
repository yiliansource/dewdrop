import { produce } from "immer";
import ShortUniqueId from "short-unique-id";
import { create } from "zustand";

const uid = new ShortUniqueId({ length: 10 });

/**
 * Holds the overall state of the application.
 */
interface AppState {
    /**
     * The user's task lists.
     */
    lists: TaskList[];
}

/**
 * Represents a single task in a list.
 */
interface Task {
    /**
     * The unique ID of the task.
     */
    id: string;
    /**
     * Is the task completed?
     */
    completed: boolean;
    /**
     * The short description that is associated with the task.
     */
    description: string;
    /**
     * When the task needs to be completed by.
     */
    deadline?: Date;
}

/**
 * Represents a list of tasks.
 */
interface TaskList {
    /**
     * The unique ID of the list.
     */
    id: string;
    /**
     * The name of the task list.
     */
    name: string;
    /**
     * The accent color of the list.
     */
    color: string;
    /**
     * The tasks in the list.
     */
    tasks: Task[];
}

export const useAppStore = create<AppState>((set) => ({
    lists: [
        {
            id: uid.rnd(),
            color: "aa0000",
            name: "University",
            tasks: [
                {
                    id: uid.rnd(),
                    completed: true,
                    description: "Distribution Theory Exercises",
                    deadline: new Date(2025, 0, 11),
                },
                {
                    id: uid.rnd(),
                    completed: false,
                    description: "Distribution Theory Exercises",
                    deadline: new Date(2025, 0, 17),
                },
                {
                    id: uid.rnd(),
                    completed: false,
                    description: "Functional Analysis II Excerises",
                    deadline: new Date(2025, 0, 20),
                },
            ],
        },
        {
            id: uid.rnd(),
            color: "00aa00",
            name: "Private",
            tasks: [
                {
                    id: uid.rnd(),
                    completed: true,
                    description: "Drink Water",
                    deadline: new Date(2025, 0, 11),
                },
            ],
        },
    ],

    createTaskList: (name: string, color = "000000") =>
        set(
            produce<AppState>((state) => {
                state.lists.push({
                    id: uid.rnd(),
                    color,
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

                list.tasks.push({
                    id: uid.rnd(),
                    completed: false,
                    description,
                    deadline,
                });
            }),
        ),
    updateTask: (listId: string, taskId: string, delta: Partial<Omit<Task, "id">>) =>
        set(
            produce<AppState>((state) => {
                const list = state.lists.find((l) => l.id === listId);
                if (!list) return;

                const task = list.tasks.find((t) => t.id === taskId);
                if (!task) return;

                Object.assign(task, delta);
            }),
        ),
    deleteTask: (listId: string, taskId: string) =>
        set(
            produce<AppState>((state) => {
                const list = state.lists.find((l) => l.id === listId);
                if (!list) return;

                const taskIndex = list.tasks.findIndex((t) => t.id === taskId);
                if (taskIndex < 0) return;

                list.tasks.splice(taskIndex, 1);
            }),
        ),
}));
