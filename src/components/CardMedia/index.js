import React, { memo } from 'react';
import './index.css';

function CardMedia({ alt, url }) {
  return (
    <div className="cardmedia__root">
      <img src={url} alt={alt} />
    </div>
  );
}
export default memo(CardMedia);
