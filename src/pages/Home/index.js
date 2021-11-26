import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import ImageCard from '../../components/ImageCard';
import Loader from '../../components/Loader';
import { firestore } from '../../firebase';

function Home() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = firestore()
      .collection('uploads')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snap) => {
        const docs = [];
        snap.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
        });
        setImages([...docs]);
        setLoading(false);
      });
    return unsub;
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box>
          {images?.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </Box>
      )}
    </>
  );
}
Home.whyDidYouRender = true;
export default Home;
