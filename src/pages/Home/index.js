import React from 'react';
import ImageCard from '../../components/ImageCard';
import Loader from '../../components/Loader';
import { usePostContext } from '../../providers/PostsProvider';

function Home() {
  const { loading, posts } = usePostContext();
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
