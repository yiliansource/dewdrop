import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyCugeHHTO26E4OBhfPbEfnjlfZE2EtZetc",
    authDomain: "dewdrop-f4ab8.firebaseapp.com",
    projectId: "dewdrop-f4ab8",
    storageBucket: "dewdrop-f4ab8.firebasestorage.app",
    messagingSenderId: "886141505906",
    appId: "1:886141505906:web:fe0a2d200984bee1c74deb",
};

console.log("init firebase");

const firebase = initializeApp(firebaseConfig);

const db = initializeFirestore(firebase, { ignoreUndefinedProperties: true });
const auth = getAuth(firebase);

export { auth, db, firebase };
