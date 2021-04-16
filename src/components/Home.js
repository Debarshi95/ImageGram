import React from "react";
import { useHistory } from "react-router";
import useFirestore from "../hooks/useFirestore";
import ImageCard from "./ImageCard";
import "./Home.css";
import Navbar from "./Navbar";
import * as ROUTES from "../constant/routes";

function Home() {
  const [error, setError] = React.useState("");

  const history = useHistory();
  const { images } = useFirestore();

  const allowedTypes = ["image/png", "image/jpeg"];

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (allowedTypes.includes(file.type)) {
        history.push(ROUTES.UPLOAD_FILE, { file: file });
      } else {
        setError("Only Images of type jpg or png allowed!");
      }
    } else {
      setError("");
    }
  };
  return (
    <div className="home__root">
      <Navbar />

      <div className="home__inputFile">
        <label htmlFor="file-input">
          <input type="file" accept="image/*" onChange={handleFile} />
        </label>
        {error && <div>{error}</div>}
      </div>
      <div className="home__cardwrapper">
        {images &&
          images.map((image) => <ImageCard key={image.id} image={image} />)}
      </div>
    </div>
  );
}

export default Home;
