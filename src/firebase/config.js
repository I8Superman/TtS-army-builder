import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCN-P1gwZz-bx1WEVk0RHiuR5VUlnz3I_M",
  authDomain: "tts--army-builder.firebaseapp.com",
  projectId: "tts--army-builder",
  storageBucket: "tts--army-builder.appspot.com",
  messagingSenderId: "232440899484",
  appId: "1:232440899484:web:ed5af027644f343195ca59"
};

// // Init firebase
// const app = initializeApp(firebaseConfig)

// // Init firestore 
// const db = getFirestore(app) // export as db

// export { db }

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);

export default app;