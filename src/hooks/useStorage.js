import React from "react";
import { storage, firestore, timeStamp } from "../firebase";

function useStorage(file, caption) {
  const [progress, setProgress] = React.useState();
  const [error, setError] = React.useState("");
  const [url, setUrl] = React.useState("");

  React.useEffect(() => {
    if (file !== null) {
      const uploadTask = storage.ref(`images/${file.name}`).put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (err) => setError(err.message),
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
            setUrl(downloadUrl);
            firestore.collection("uploads").add({
              caption: caption,
              url: downloadUrl,
              createdAt: timeStamp(),
            });
          });
        }
      );
    }
  }, [file, caption]);
  return {
    progress,
    error,
    url,
  };
}

export default useStorage;
