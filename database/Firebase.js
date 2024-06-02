import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    // apiKey: "AIzaSyCux9bTKN9FyVOLbETNukDwv2Q8QnhqSjk",
    // authDomain: "product-page-94cad.firebaseapp.com",
    // databaseURL: "https://product-page-94cad-default-rtdb.asia-southeast1.firebasedatabase.app",
    // projectId: "product-page-94cad",
    // storageBucket: "product-page-94cad.appspot.com",
    // messagingSenderId: "358690562695",
    // appId: "1:358690562695:web:238f513df58ffc34838e22",
    // measurementId: "G-44NDCPZPXH"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const storage = firebase.storage();
const store = firebase.firestore();

export {firebase,auth,storage,store};
