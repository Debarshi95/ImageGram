import { useEffect, useState } from 'react';
import { storage, firestore, serverTimestamp } from '../firebase';

function useStorage(file, caption, userId) {
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (file) {
      setLoading(true);
      const uploadTask = storage().ref(`uploads/${file.name}`).put(file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (err) => {
          setError(err.message);
          setLoading(false);
        },
        async () => {
          const imageUrl = await uploadTask.snapshot.ref.getDownloadURL();

          if (imageUrl) {
            await firestore().collection('uploads').add({
              caption,
              imageUrl,
              likedBy: [],
              uploadedBy: userId,
              createdAt: serverTimestamp(),
            });
          }
          setUrl(imageUrl);
          setLoading(false);
        }
      );
    }
  }, [file, caption, userId]);
  return {
    progress,
    error,
    url,
    loading,
  };
}

export default useStorage;
