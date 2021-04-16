import React from "react";
import { firestore } from "../firebase";

function useFirestore() {
  const [images, setImages] = React.useState(null);

  React.useEffect(() => {
    const unsub = firestore
      .collection("uploads")
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (snapshot) =>
          setImages(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          ),
        (err) => console.log(err)
      );
    return () => unsub();
  }, []);

  return {
    images,
  };
}

export default useFirestore;
