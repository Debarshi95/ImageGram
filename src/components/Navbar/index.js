import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './index.css';
import { Avatar, IconButton } from '@material-ui/core';
import { AddCircleOutlined } from '@material-ui/icons';
import { useToasts } from 'react-toast-notifications';
import SignOutDialog from '../SignOutDialog';
import { useAuth } from '../../providers/AuthProvider';
import routes from '../../utils/routes';

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
  return (
    <nav
      className={`navbar__root ${
        !isAuthenticated ? 'navbar__unsignedlinks' : 'navbar__signedlinks'
      }`}
    >
      <Link to={routes.home.path}>ImageGram</Link>
      <div>
        {isAuthenticated ? (
          <div>
            <input
              type="file"
              accept="image/*"
              id="file-input"
              ref={inputRef}
              onChange={handleFile}
            />

            <IconButton component="span" onClick={handleClick}>
              <AddCircleOutlined />
            </IconButton>

            <IconButton onClick={() => setOpen(true)}>
              <Avatar>{user?.displayName?.split('')[0]}</Avatar>
            </IconButton>
            <SignOutDialog open={open} setOpen={setOpen} />
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
