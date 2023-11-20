// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIugyOPRm1j8tbcUou4mkAqFKeN9T-pU4",
  authDomain: "crud-proyect-p3.firebaseapp.com",
  projectId: "crud-proyect-p3",
  storageBucket: "crud-proyect-p3.appspot.com",
  messagingSenderId: "220063668810",
  appId: "1:220063668810:web:f0c1c00ca0387144ef64b3",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();

export const guardartarea = (title, descripcion) =>
  addDoc(collection(db, "tareas"), { title, descripcion });

export const optenerTarea = async () => {
  const querySnapshot = await getDocs(collection(db, "tareas"));
  return querySnapshot;
};
export const onOptenerTarea = (callback) =>
  onSnapshot(collection(db, "Tareas"), callback);
export { onSnapshot, collection };
