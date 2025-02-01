import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAhMwwiIXjz9sSLbRktZi80ixqqW80uMnc",
    authDomain: "pawpatrol-e2783.firebaseapp.com",
    projectId: "pawpatrol-e2783",
    storageBucket: "pawpatrol-e2783.firebasestorage.app",
    messagingSenderId: "109348880419",
    appId: "1:109348880419:web:d02a9e2715ff84d23cb196",
    measurementId: "G-2TCRMEQ31Q"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, db, storage };
