import React from "react";
import * as ROUTES from "../constant/routes";
import { Link, useHistory } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../hooks/useAuth";
import { IconButton } from "@material-ui/core";
import { AccountCircleRounded, PhotoCamera } from "@material-ui/icons";
import SignOutDialog from "./SignOutDialog";

function Navbar() {
  const [error, setError] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const { user } = useAuth();
  const history = useHistory();

  const allowedTypes = ["image/png", "image/jpeg"];
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("hero");
      if (allowedTypes.includes(file.type)) {
        history.push(`${user.uid}/upload`, { file: file });
      } else {
        setError("Only Images of type jpg or png allowed!");
      }
    } else {
      setError("");
    }
  };

  return (
    <nav
      className={`navbar__root ${
        user === null ? `navbar__unsignedlinks` : `navbar__signedlinks`
      }`}
    >
      <Link to={ROUTES.HOME}>FireGram</Link>
      <div>
        {!user && (
          <>
            <Link to={ROUTES.SIGN_IN}>Sign in</Link>
            <Link to={ROUTES.SIGN_UP}>Sign up</Link>
          </>
        )}
        {user && (
          <>
            <input
              type="file"
              accept="image/*"
              id="file-input"
              onChange={handleFile}
            />
            <label htmlFor="file-input">
              <IconButton component="span">
                <PhotoCamera />
              </IconButton>
            </label>
            <IconButton onClick={() => setOpen(true)}>
              <AccountCircleRounded />
            </IconButton>
            <SignOutDialog open={open} setOpen={setOpen} />
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
