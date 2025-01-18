import { motion } from "motion/react";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

import { useAppStore } from "./app-state";
import { TaskList } from "./task-list";

export function DewdropApp() {
    const state = useAppStore();
    const [currentListIndex, setCurrentList] = useState(0);

    const swipeHandlers = useSwipeable({
        onSwiped: (e) => {
            if (e.dir === "Right" && currentListIndex + 1 < state.lists.length) setCurrentList((i) => i + 1);
            if (e.dir === "Left" && currentListIndex - 1 >= 0) setCurrentList((i) => i - 1);
        },
    });

    return (
        <motion.div className="p-3 h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} {...swipeHandlers}>
            <TaskList listId={state.lists[currentListIndex].id} />
        </motion.div>
    );
}
