export interface TodoData {
    id: string;
    description: string;
    completed: boolean;
    deadline?: Date;
    createdAt: Date;
}
