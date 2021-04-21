import React from "react";
import { firestore } from "../firebase";

function useFirestore(collectionName) {
  const [docs, setDocs] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsub = firestore
      .collection(collectionName)
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (snapshot) => {
          setDocs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
          setLoading(false);
        },
        (err) => console.log(err)
      );
    return () => unsub();
  }, [collectionName]);

  return {
    docs,
    loading,
  };
}

export default useFirestore;
