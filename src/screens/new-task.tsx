import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { addDoc, collection } from "firebase/firestore";
import { useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as yup from "yup";

import { TodoData } from "../dewdrop-types";
import { auth, db } from "../firebase/app";
import { todoConverterForUser } from "../firebase/converter";

const schema = yup
    .object()
    .shape({
        description: yup.string().required("The description is required."),
        deadline: yup.date().optional(),
    })
    .required();

export function NewTaskScreen() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const user = useAuthState(auth)[0]!;
    const todoConverter = useMemo(() => todoConverterForUser(user.uid), [user.uid]);

    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = async (data: yup.InferType<typeof schema>) => {
        setSubmitting(true);

        await addDoc(collection(db, "todos").withConverter(todoConverter), {
            description: data.description,
            completed: false,
            createdAt: new Date(),
        } as TodoData);

        setSubmitting(false);
        navigate("/calendar");
    };

    return (
        <div className="p-4">
            <div className="py-1 mb-2 flex justify-between">
                <div></div>
                <h1 className="text-xl font-bold">New Task</h1>
                <div></div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={clsx(submitting && "opacity-50")}>
                <div className="mb-1 flex flex-col bg-white rounded-xl px-3 py-2">
                    <label htmlFor="description" className="text-xs">
                        Description
                    </label>
                    <input {...register("description")} placeholder="What do you want to do?" autoComplete="off" />
                </div>
                <p className="mb-3 text-red-700 text-xs">{errors.description?.message}</p>

                {/* <input {...register("deadline")} /> */}

                <input
                    type="submit"
                    disabled={submitting}
                    className="py-2 px-3 text-center bg-violet-600 text-white rounded-lg w-full"
                />
            </form>
        </div>
    );
}
