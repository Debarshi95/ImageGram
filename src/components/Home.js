import React from "react";
import { useHistory } from "react-router";
import useFirestore from "../hooks/useFirestore";
import ImageCard from "./ImageCard";
import "./Home.css";
import Navbar from "./Navbar";
import Loader from "./Loader";

function Home() {
  const { images, loading } = useFirestore();

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
