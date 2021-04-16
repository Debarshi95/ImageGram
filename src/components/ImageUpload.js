import React from "react";
import useStorage from "../hooks/useStorage";
import "./ImageUpload.css";
import { useHistory, useLocation } from "react-router";
import { LinearProgress } from "@material-ui/core";
import * as ROUTES from "../constant/routes";

function ImageUpload() {
  const history = useHistory();
  const { state } = useLocation();
  const [file, setFile] = React.useState(null);
  const [caption, setCaption] = React.useState("");

  const { progress, url } = useStorage(file, caption);

  React.useEffect(() => {
    if (url) {
      history.push(ROUTES.HOME);
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
          <button type="button" onClick={upload} disabled={caption === ""}>
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
