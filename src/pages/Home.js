import React from "react";
import useFirestore from "../hooks/useFirestore";
import ImageCard from "../components/ImageCard";
import "./Home.css";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

function Home() {
  const { docs: images, loading } = useFirestore("uploads");

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="home__cardwrapper">
        {images &&
          images.map((image) => <ImageCard key={image.id} image={image} />)}
      </div>
    </>
  );
}

export default Home;
