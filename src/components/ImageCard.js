import React from "react";
import "./ImageCard.css";

function ImageCard({ image }) {
  return (
    <div className="imagecard__root">
      <h3>{image.caption}</h3>
      <img src={image.url} alt={image.caption} />
      <h5>{image.caption}</h5>
    </div>
  );
}

export default ImageCard;
