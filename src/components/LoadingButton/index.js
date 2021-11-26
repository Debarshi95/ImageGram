import { Button } from '@material-ui/core';
import React from 'react';
import './index.css';

function LoadingButton({ loadingText, icon, loading, children, onClick, disabled, className }) {
  return (
    <div className={`${className} loadingButton__root ${disabled && 'disabled__button'}`}>
      {loading ? (
        <Button className="button__uploading" endIcon={icon}>
          {loadingText}
        </Button>
      ) : (
        <Button type="button" onClick={onClick} disabled={loading || disabled}>
          {children}
        </Button>
      )}
    </div>
  );
}

LoadingButton.defaultProps = {
  loadingText: '',
  loading: true,
  icon: null,
  children: '',
};

export default LoadingButton;
