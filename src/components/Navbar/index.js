import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './index.css';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
} from '@material-ui/core';
import { AddCircleOutlined } from '@material-ui/icons';
import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../../providers/AuthProvider';
import routes from '../../utils/routes';
import { auth } from '../../firebase';

function Navbar() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const { user, isAuthenticated } = useAuth();
  const { addToast } = useToasts();

  const history = useHistory();

  const allowedTypes = ['image/png', 'image/jpeg'];

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFile = () => {
    const file = inputRef.current.files[0];
    if (file) {
      if (allowedTypes.includes(file.type)) {
        history.push('/upload', { file });
      } else {
        addToast('Only Images of type jpg or png allowed!', {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const renderDialog = () => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className="navbar__dialogContent">
          <DialogContentText id="alert-dialog-description" className="navbar__dialogText">
            Do you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
              auth().signOut();
            }}
            color="primary"
            autoFocus
          >
            Sign out
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  return (
    <nav className={`navbar__root ${!isAuthenticated && 'navbar__links'}`}>
      <div className="navbar__container">
        <Link to={routes.home.path}>ImageGram</Link>
        {isAuthenticated ? (
          <div>
            <input
              type="file"
              accept="image/*"
              id="file-input"
              ref={inputRef}
              onChange={handleFile}
            />

            <IconButton component="button" onClick={handleClick}>
              <AddCircleOutlined />
            </IconButton>

            <IconButton onClick={() => setOpen(true)}>
              <Avatar>{user?.displayName?.split('')[0]}</Avatar>
            </IconButton>
            {renderDialog()}
          </div>
        ) : (
          <div>
            <Link to={routes.signIn.path}>Sign in</Link>
            <Link to={routes.signUp.path}>Sign up</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
