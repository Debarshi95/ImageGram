import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";

var config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_API_ID,
};

const firebaseApp = firebase.initializeApp(config);
const storage = firebaseApp.storage();
const firestore = firebaseApp.firestore();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;
const auth = firebaseApp.auth();

const checkUserNameExists = async (username) => {
  const res = await firestore
    .collection("users")
    .where("username", "==", username)
    .get();
  return res.docs.length > 0;
};
const saveUser = async (uid, username, fullname, email) => {
  const res = await firestore.collection("users").add({
    uid,
    username,
    fullname,
    email,
    createdAt: timeStamp(),
  });
  console.log(res);
  return res;
};
export { storage, firestore, timeStamp, auth, saveUser, checkUserNameExists };
