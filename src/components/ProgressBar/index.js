import React, { useEffect } from 'react';

function ProgressBar({ progress, url, setFile, setUpload }) {
  useEffect(() => {
    if (url) {
      setFile(null);
      setUpload(false);
    }
  }, [progress, setFile, url, setUpload]);
  return <progress value={progress} />;
}

export default ProgressBar;
