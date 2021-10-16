import React from 'react';
import useFirestore from '../../hooks/useFirestore';
import ImageCard from '../../components/ImageCard';
import Navbar from '../../components/Navbar';
import Loader from '../../components/Loader';

function Home() {
  const { docs: images, loading } = useFirestore('uploads');

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />

      {images && images.map((image) => <ImageCard key={image.id} image={image} />)}
    </>
  );
}

export default Home;
