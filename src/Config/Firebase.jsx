import { initializeApp } from "firebase/app";
import { getAuth, deleteUser, onAuthStateChanged ,  } from "firebase/auth";
import { getFirestore, collection, onSnapshot, deleteDoc , doc, query,where, getDocs  } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwEqIHka7xNBkmMbQ8y7SYJn5yvSoCFME",
  authDomain: "practice-59895.firebaseapp.com",
  databaseURL: "https://practice-59895-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "practice-59895",
  storageBucket: "practice-59895.appspot.com",
  messagingSenderId: "199591437506",
  appId: "1:199591437506:web:4ddcfb5950a80527e8475b",
  measurementId: "G-BVJH3VNX01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export{db, collection, onSnapshot,auth, deleteUser, onAuthStateChanged , deleteDoc , doc, query,where, getDocs }
 