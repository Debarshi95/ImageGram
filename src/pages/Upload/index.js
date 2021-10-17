import React, { useEffect, useState } from 'react';
import { LinearProgress } from '@material-ui/core';
import './index.css';
import { useHistory, useLocation } from 'react-router-dom';
import useStorage from '../../hooks/useStorage';
import routes from '../../utils/routes';

function ImageUpload() {
  const history = useHistory();
  const { state } = useLocation();
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');

  const { progress, url } = useStorage(file, caption);

  useEffect(() => {
    if (url) {
      history.push(routes.home.path);
    }
  }, [history, url]);

  const upload = () => {
    setFile(state.file);
  };

  return (
    <>
      {progress && <LinearProgress value={progress} variant="determinate" />}
      <div className="imageupload__root">
        <div className="imageupload__caption">
          <input
            autoComplete="off"
            type="text"
            name="caption"
            value={caption}
            onChange={({ target }) => setCaption(target.value)}
            placeholder="Caption"
            aria-label="Caption"
          />
        </div>
        <img src={URL.createObjectURL(state.file)} alt="" />
        <div className="imageupload__btnActions">
          <button type="button" onClick={upload} disabled={caption === ''}>
            Upload
          </button>
          <button type="button" onClick={() => history.goBack()}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default ImageUpload;
