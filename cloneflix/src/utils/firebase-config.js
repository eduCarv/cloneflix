import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVVu3-_OZF1CCrCfRvh7WEw2e_7RCMR1w",
  authDomain: "react-netflix-clone-70013.firebaseapp.com",
  projectId: "react-netflix-clone-70013",
  storageBucket: "react-netflix-clone-70013.appspot.com",
  messagingSenderId: "760464076550",
  appId: "1:760464076550:web:72bfc6da25be4a23e17887",
  measurementId: "G-987LD8DN0Z",
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
