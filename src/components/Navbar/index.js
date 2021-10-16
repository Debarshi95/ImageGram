import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './index.css';
import { Avatar, IconButton } from '@material-ui/core';
import { AddCircleOutlined } from '@material-ui/icons';
import { useToasts } from 'react-toast-notifications';
import SignOutDialog from '../SignOutDialog';
import { useAuth } from '../../provider/AuthProvider';
import * as ROUTES from '../../constant/routes';

function Navbar() {
  const [open, setOpen] = React.useState(false);
  const { user } = useAuth();
  const { addToast } = useToasts();

  const history = useHistory();

  const allowedTypes = ['image/png', 'image/jpeg'];
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (allowedTypes.includes(file.type)) {
        history.push(`${user.uid}/upload`, { file });
      } else {
        addToast('Only Images of type jpg or png allowed!', {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    }
  };

  return (
    <nav className={`navbar__root ${!user ? 'navbar__unsignedlinks' : 'navbar__signedlinks'}`}>
      <Link to={ROUTES.HOME}>ImageGram</Link>
      <div>
        {!user && (
          <>
            <Link to={ROUTES.SIGN_IN}>Sign in</Link>
            <Link to={ROUTES.SIGN_UP}>Sign up</Link>
          </>
        )}
        {user && (
          <>
            <input type="file" accept="image/*" id="file-input" onChange={handleFile} />
            <span>
              <IconButton component="span">
                <AddCircleOutlined />
              </IconButton>
            </span>
            <IconButton onClick={() => setOpen(true)}>
              <Avatar>{user?.displayName?.split('')[0]}</Avatar>
            </IconButton>
            <SignOutDialog open={open} setOpen={setOpen} />
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
