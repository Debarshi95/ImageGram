import Firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_API_ID,
};

const firebase = !Firebase.apps.length ? Firebase.initializeApp(config) : Firebase.app;

export const auth = Firebase.auth();
export const firestore = Firebase.firestore();
export const storage = Firebase.storage();
export const { serverTimestamp } = Firebase.firestore.FieldValue;
export default firebase;
