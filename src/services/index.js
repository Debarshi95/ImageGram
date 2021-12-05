import { serverTimestamp, firestore, auth } from '../firebase';

export const checkUserNameExists = async (username) => {
  const res = await firestore.collection('users').where('username', '==', username).get();
  return res.docs.length > 0;
};

export const saveUser = async (uid, username, fullname, email) => {
  const res = await firestore.collection('users').doc(uid).set({
    username,
    fullname,
    email,
    createdAt: serverTimestamp(),
  });

  return res;
};

export const updatePostLikes = async (imageId, users) => {
  await firestore
    .collection('uploads')
    .doc(imageId)
    .update({
      likedBy: [...users],
    });
};

export const getUserInfo = async (userId) => {
  const res = await firestore.collection('users').doc(userId).get();
  return res;
};

export const addComment = async (imageId, userId, comment) => {
  await firestore.collection('comments').add({
    imageId,
    userId,
    comment,
    createdAt: serverTimestamp(),
  });
};

export const signInWithEmailAndPassword = async (email, password) => {
  const res = await auth.signInWithEmailAndPassword(email, password);
  return res;
};

export const createUserWithEmailAndPassword = async (email, password) => {
  const res = await auth.createUserWithEmailAndPassword(email, password);
  return res;
};
