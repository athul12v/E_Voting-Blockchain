import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAzYUBc04Ug1248Wa5gcIBNvbnp8TG4uN4",
  authDomain: "e-voting-f0028.firebaseapp.com",
  projectId: "e-voting-f0028",
  storageBucket: "e-voting-f0028.appspot.com",
  messagingSenderId: "306213709285",
  appId: "1:306213709285:web:fb420146d817b6c7687b0c",
  measurementId: "G-15FNVC0RKY",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };
