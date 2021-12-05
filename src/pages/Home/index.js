import React, { useEffect, useState } from 'react';
import ImageCard from '../../components/ImageCard';
import Loader from '../../components/Loader';
import { firestore } from '../../firebase';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = firestore()
      .collection('uploads')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snap) => {
        const docs = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPosts(docs);
        setLoading(false);
      });
    return unsub;
  }, []);

  if (loading) return <Loader />;
  return (
    <div>
      {posts?.map((post) => (
        <ImageCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Home;
