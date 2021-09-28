import { CircularProgress } from "@material-ui/core";
import React from "react";
import "./index.css";

function ButtonSubmitting({ submitting, disabled, text, handler }) {
  return (
    <>
      {submitting && (
        <div className="buttonsubmitting__loader">
          <CircularProgress />
        </div>
      )}

      {!submitting && (
        <button
          className="buttonsubmitting__button"
          type="click"
          disabled={disabled}
          onClick={handler}
        >
          {text}
        </button>
      )}
    </>
  );
}

export default ButtonSubmitting;
