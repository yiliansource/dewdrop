import clsx from "clsx";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { HiCalendar, HiHome, HiPlus } from "react-icons/hi";
import { NavLink, Navigate, Route, Routes, useLocation } from "react-router";

import { Banner } from "./banner";
import { auth } from "./firebase/app";
import { HomeScreen } from "./screens/home";
import { NewTaskScreen } from "./screens/new-task";
import { SettingsScreen } from "./screens/settings";
import { TasksScreen } from "./screens/tasks";

const googleProvider = new GoogleAuthProvider();

interface NavigationItem {
    label: string;
    to: string;
    icon: React.ReactNode;
}

const navigation: NavigationItem[] = [
    {
        label: "Home",
        to: "/home",
        icon: <HiHome />,
    },
    {
        label: "Calendar",
        to: "/calendar",
        icon: <HiCalendar />,
    },
];

export function DewdropApp() {
    const [user, loading] = useAuthState(auth);
    const location = useLocation();

    const [minSplashTimePassed, setMinSplashTimePassed] = useState(false);

    const showSplash = useMemo(() => !user || !minSplashTimePassed, [user, minSplashTimePassed]);

    useEffect(() => {
        if (minSplashTimePassed) return;

        setTimeout(() => setMinSplashTimePassed(true), 2000);
    }, [minSplashTimePassed]);

    const login = () => {
        signInWithPopup(auth, googleProvider);
    };

    return (
        <div className="relative w-screen h-screen bg-violet-50">
            {!loading && !user && <Navigate to="/" replace />}
            <AnimatePresence>
                {showSplash && (
                    <motion.div
                        className="fixed z-10 top-0 left-0 w-screen h-screen bg-violet-400"
                        initial={false}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="flex flex-col h-full items-center justify-center">
                            <motion.div className="mb-24" layout>
                                <Banner />
                            </motion.div>
                            {minSplashTimePassed &&
                                !user &&
                                (loading ? (
                                    <div>loading...</div>
                                ) : (
                                    <>
                                        <motion.div
                                            className="py-2 px-5 rounded-lg bg-violet-600 text-white"
                                            onClick={login}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            layout
                                        >
                                            Sign in with Google
                                        </motion.div>
                                    </>
                                ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <main className="w-full h-full pb-10">
                {!loading && user && (
                    <Routes location={location}>
                        <Route path="/home" element={<HomeScreen />} />
                        <Route path="/calendar" element={<TasksScreen />} />
                        <Route path="/new-task" element={<NewTaskScreen />} />
                        <Route path="/settings" element={<SettingsScreen />} />

                        <Route
                            path="*"
                            element={user ? <Navigate to="/home" replace /> : <Navigate to="/" replace />}
                        />
                    </Routes>
                )}
            </main>
            <div className="fixed left-0 bottom-0 w-full h-14 rounded-t-2xl bg-violet-200">
                <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-violet-600 rounded-full">
                    <NavLink to="/new-task" className="flex justify-center items-center h-full text-white text-3xl">
                        <HiPlus />
                    </NavLink>
                </div>
                <div className="flex flex-row justify-center items-center w-1/2 h-full gap-4">
                    {navigation.map((item) => (
                        <div key={item.to}>
                            <NavLink
                                className={({ isActive }) =>
                                    clsx("block px-4 py-2 text-2xl", isActive && " text-violet-600")
                                }
                                to={item.to}
                            >
                                {item.icon}
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
