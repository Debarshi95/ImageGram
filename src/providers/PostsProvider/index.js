import React, { createContext, useEffect, useState, useMemo, useContext } from 'react';
import { firestore } from '../../firebase';

const PostContext = createContext();
export const usePostContext = () => {
  const ctx = useContext(PostContext);
  if (!ctx) {
    throw new Error('');
  }
  return { ...ctx };
};
function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsub = firestore
      .collection('uploads')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snap) => {
        const docs = [];
        let modifiedDoc;
        snap.docChanges().forEach((change) => {
          const { doc } = change;
          if (change.type === 'added') {
            docs.push({ id: doc.id, ...doc.data() });
          }
          if (change.type === 'modified') {
            modifiedDoc = { id: doc.id, ...doc.data() };
          }
        });

        setPosts((prevPosts) => {
          if (modifiedDoc) {
            const filteredPosts = prevPosts.filter((post) => post.id !== modifiedDoc.id);
            const modifiedPosts = [modifiedDoc, ...filteredPosts].sort(
              (a, b) => b.createdAt - a.createdAt
            );
            return [...modifiedPosts];
          }
          return [...docs, ...prevPosts];
        });
        setLoading(false);
      });
    return unsub;
  }, []);
  const value = useMemo(() => ({ posts, loading }), [posts, loading]);

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

export default PostsProvider;
