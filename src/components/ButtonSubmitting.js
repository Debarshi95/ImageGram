import { CircularProgress } from "@material-ui/core";
import React from "react";
import "./ButtonSubmitting.css";

function ButtonSubmitting({ submitting, disabled, text }) {
  return (
    <div className="buttonsubmitting__root">
      {submitting && <CircularProgress className="buttonsubmitting__spinner" />}

      {!submitting && (
        <button type="click" disabled={disabled}>
          {text}
        </button>
      )}
    </div>
  );
}

export default ButtonSubmitting;
