import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNDQyZHitCAjyupnVxNzU1YKfI4zBOMss",
  authDomain: "hackingtransitions-development.firebaseapp.com",
  projectId: "hackingtransitions-development",
  storageBucket: "hackingtransitions-development.appspot.com",
  messagingSenderId: "473992713297",
  appId: "1:473992713297:web:68e712395d1ccf79c49470",
};

export const firebase_app = initializeApp(firebaseConfig);
export const auth = getAuth(firebase_app);
