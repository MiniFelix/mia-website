import * as firebase from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnFmno_Z5Dka7JnCvwUV7TgaH1HTSRZe8",
  authDomain: "mia-website-a1ca0.firebaseapp.com",
  projectId: "mia-website-a1ca0",
  storageBucket: "mia-website-a1ca0.appspot.com",
  messagingSenderId: "430984410620",
  appId: "1:430984410620:web:9555851d8697bc84146e79",
  measurementId: "G-DPYZCBN46W",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export { db };
