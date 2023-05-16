// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC5eC-a_aKa_GLfbKq2kaiucfN03Ag3Ygw',
  authDomain: 'albums-upvote.firebaseapp.com',
  projectId: 'albums-upvote',
  storageBucket: 'albums-upvote.appspot.com',
  messagingSenderId: '890011424686',
  appId: '1:890011424686:web:0ebd4bed81b5d3269dda3f',
  measurementId: 'G-RY0QK6HYR6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
