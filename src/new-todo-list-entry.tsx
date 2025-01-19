import { motion } from "motion/react";

export function NewTodoListEntry() {
    return (
        <motion.div className="relative rounded-xl bg-white/25 shadow-md" animate={{ opacity: 1 }} layout>
            <div className="relative p-3 flex flex-row gap-2">
                <div>
                    <div className="w-5 h-5"></div>
                </div>
                <div>
                    <p className="">Click to add a new task.</p>
                </div>
            </div>
        </motion.div>
    );
}
