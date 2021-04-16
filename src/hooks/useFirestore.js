import React from "react";
import { firestore } from "../firebase";

function useFirestore() {
  const [images, setImages] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsub = firestore
      .collection("uploads")
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (snapshot) => {
          setImages(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
          setLoading(false);
        },
        (err) => console.log(err)
      );
    return () => unsub();
  }, []);

  return {
    images,
    loading,
  };
}

export default useFirestore;
