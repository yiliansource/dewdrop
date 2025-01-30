import { useAuthState } from "react-firebase-hooks/auth";
import { HiCog } from "react-icons/hi";
import { NavLink } from "react-router";

import { auth } from "../firebase/app";

export function HomeScreen() {
    const [user] = useAuthState(auth);

    if (!user) return null;

    return (
        <div className="p-4">
            <div className="mb-4 flex flex-row items-center gap-3">
                <div>
                    <div className="bg-gray-400 w-10 h-10 rounded-full overflow-hidden">
                        <img src={user.photoURL!} /> {/* todo: add placeholder */}
                    </div>
                </div>
                <div>
                    <p className="m-0 text-sm">Good morning,</p>
                    <p className="m-0 text-xl font-bold leading-none">{user.displayName}</p>
                </div>
                <div className="ml-auto mr-0">
                    <NavLink to="/settings" className="text-2xl">
                        <HiCog />
                    </NavLink>
                </div>
            </div>
            <div className="flex flex-row items-center">
                <h2 className="text-xl font-bold">In Progress</h2>
                <span className="ml-2 text-sm">(6)</span>
            </div>
        </div>
    );
}
