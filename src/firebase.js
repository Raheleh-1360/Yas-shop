import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNfAYvztm6c9ExzIkSeFMpo4WPPYVgyZ8",
  authDomain: "online-shop-75e5c.firebaseapp.com",
  projectId: "online-shop-75e5c",
  storageBucket: "online-shop-75e5c.appspot.com",
  messagingSenderId: "474693007541",
  appId: "1:474693007541:web:5fe632f4f272c4ad7226fc",
  measurementId: "G-MS5MZEYRHN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db ,app};
