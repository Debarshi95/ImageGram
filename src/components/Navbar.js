import React from "react";
import * as ROUTES from "../constant/routes";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { user } = useAuth();
  return (
    <nav className="navbar__root">
      <Link to={ROUTES.HOME}>home</Link>
      <div>
        {!user && (
          <>
            <Link to={ROUTES.SIGN_IN}>Sign in</Link>
            <Link to={ROUTES.SIGN_UP}>Sign up</Link>
          </>
        )}
        {user && <Link to={`${user.uid}/profile`}>Profile</Link>}
      </div>
    </nav>
  );
}

export default Navbar;
