import React from "react";
import "./ImageCard.css";

function ImageCard({ image }) {
  return (
    <div className="imagecard__root">
      <img src={image.url} alt="" />
    </div>
  );
}

export default ImageCard;
