import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDuvgclKAwU_pZY307XhMvRP7dkcpU0-Lk",
    authDomain: "juwanfood.firebaseapp.com",
    projectId: "juwanfood",
    storageBucket: "juwanfood.appspot.com",
    messagingSenderId: "933928070591",
    appId: "1:933928070591:web:144394252ef2edba0b850a",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
