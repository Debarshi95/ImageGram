import { CircularProgress } from '@material-ui/core';
import React from 'react';
import './index.css';

function Loader() {
  return (
    <div className="loader">
      <CircularProgress />
    </div>
  );
}

export default Loader;
