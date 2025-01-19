import { produce } from "immer";
import ShortUniqueId from "short-unique-id";
import { create } from "zustand";

const uid = new ShortUniqueId({ length: 10 });

type TodoId = string;

/**
 * Holds the overall state of the application.
 */
interface DewdropState {
    todos: Todo[];
    lists: TodoList[];

    createTodoList(name: string): TodoList;

    createTodo(listId: string, description: string, deadline?: Date): Todo;
    setTodoCompleted: (todoId: TodoId, completed?: boolean) => void;
}

interface Todo {
    id: TodoId;
    completed: boolean;
    description: string;
    deadline?: Date;
}

interface TodoList {
    id: string;
    name: string;
    todos: TodoId[];
}

const sampleUids = Array.from(Array(5), () => uid.rnd());

export const useDewdropStore = create<DewdropState>((set) => ({
    todos: [
        {
            id: sampleUids[0],
            completed: false,
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
            completed: false,
            description: "Drink Water",
            deadline: new Date(2025, 0, 11),
        },
    ],
    lists: [
        {
            id: uid.rnd(),
            name: "University",
            todos: sampleUids.slice(0, 3),
        },
        {
            id: uid.rnd(),
            name: "Private",
            todos: [sampleUids[3]],
        },
    ],

    createTodoList: (name: string): TodoList => {
        const newList: TodoList = {
            id: uid.rnd(),
            name,
            todos: [],
        };

        set(
            produce<DewdropState>((state) => {
                state.lists.push(newList);
            }),
        );

        return newList;
    },
    deleteTodoList: (listId: string) =>
        set(
            produce<DewdropState>((state) => {
                const listIndex = state.lists.findIndex((l) => l.id === listId);
                if (listIndex < 0) return;

                state.lists.splice(listIndex, 1);
            }),
        ),

    createTodo: (listId: string, description: string, deadline?: Date): Todo => {
        const newTodo: Todo = {
            id: uid.rnd(),
            completed: false,
            description,
            deadline,
        };

        set(
            produce<DewdropState>((state) => {
                const list = state.lists.find((l) => l.id === listId);
                if (!list) return;

                state.todos.push(newTodo);
                list.todos.push(newTodo.id);
            }),
        );

        return newTodo;
    },
    setTodoCompleted: (todoId: TodoId, completed = true) => {
        set(
            produce<DewdropState>((state) => {
                const todo = state.todos.find((t) => t.id === todoId);
                if (!todo) return;

                todo.completed = completed;
            }),
        );
    },

    // updateTask: (taskId: string, delta: Partial<Omit<Todo, "id">>) =>
    //     set(
    //         produce<DewdropState>((state) => {
    //             const task = state.todos.find((t) => t.id === taskId);
    //             if (!task) return;

    //             Object.assign(task, delta);
    //         }),
    //     ),
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
