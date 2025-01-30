import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    Timestamp,
} from "firebase/firestore";

import { TodoData } from "../dewdrop-types";

type TodoConverterForUser = (uid: string) => FirestoreDataConverter<TodoData>;

export const todoConverterForUser: TodoConverterForUser = (uid) => ({
    toFirestore(post: TodoData): DocumentData {
        return {
            uid: uid,
            description: post.description,
            completed: post.completed,
            deadline: post.deadline ? Timestamp.fromDate(post.deadline) : undefined,
            created_at: Timestamp.fromDate(post.createdAt),
        };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): TodoData {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            description: data.description,
            completed: data.completed,
            deadline: (data.deadline as Timestamp)?.toDate(),
            createdAt: (data.created_at as Timestamp).toDate(),
        };
    },
});
