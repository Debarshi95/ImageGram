import React from "react";

function ProgressBar({ progress, url, setFile, setUpload }) {
  React.useEffect(() => {
    if (url) {
      setFile(null);
      setUpload(false);
    }
  }, [progress, setFile, url, setUpload]);
  return (
    <div>
      <progress value={progress} />
    </div>
  );
}

export default ProgressBar;
