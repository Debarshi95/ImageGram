import React, { useEffect, useState } from 'react';
import { Box, Button, LinearProgress } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import LoadingButton from '../../components/LoadingButton';
import useStorage from '../../hooks/useStorage';
import routes from '../../utils/routes';
import { useAuth } from '../../providers/AuthProvider';
import './index.css';

function Upload() {
  const history = useHistory();
  const { state } = useLocation();
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const { user } = useAuth();

  const { progress, url, loading } = useStorage(file, caption, user?.uid);

  useEffect(() => {
    if (url) {
      history.push(routes.home.path);
    }
  }, [history, url]);

  const handleUpload = () => {
    setFile(state.file);
  };

  return (
    <div className="upload__root">
      <LinearProgress
        value={progress}
        variant="determinate"
        className={`upload__progress ${loading && 'progress__visible'}`}
      />
      <Box className="upload__container">
        <input
          autoComplete="off"
          type="text"
          name="caption"
          value={caption}
          onChange={({ target }) => setCaption(target.value)}
          placeholder="Caption"
          aria-label="Caption"
          className="upload__caption"
        />
        <img src={URL.createObjectURL(state.file)} alt="" />
        <div className="upload__btnActions">
          <LoadingButton
            onClick={handleUpload}
            loading={loading}
            loadingText="Uploading..."
            disabled={caption === ''}
          >
            Upload
          </LoadingButton>
          <Button type="button" onClick={() => history.goBack()}>
            Cancel
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default Upload;
