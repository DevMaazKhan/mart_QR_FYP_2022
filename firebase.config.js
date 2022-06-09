import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQT-mp7RUkYeiwV0x-CKjXpaO3203MC30",
  authDomain: "mart-qr.firebaseapp.com",
  projectId: "mart-qr",
  storageBucket: "mart-qr.appspot.com",
  messagingSenderId: "563665203743",
  appId: "1:563665203743:web:4b8ad0956e4c3721f59b2a",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();

export const UserCollection = collection(db, "User");
export const MartCollection = collection(db, "Mart");
export const MartInfoCollection = collection(db, "MartInfo");
export const ItemCollection = collection(db, "Item");
export const ShelveCollection = collection(db, "Shelve");
export const FloorCollection = collection(db, "Floor");
export const CompanyCollection = collection(db, "Company");
