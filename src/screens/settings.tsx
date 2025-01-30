import { HiLogout } from "react-icons/hi";

import { auth } from "../firebase/app";

export function SettingsScreen() {
    const signOut = () => {
        auth.signOut();
    };

    return (
        <div className="p-4">
            <div className="flex flex-row items-center">
                <div className="ml-auto mr-0 text-2xl" onClick={signOut}>
                    <HiLogout />
                </div>
            </div>
        </div>
    );
}
