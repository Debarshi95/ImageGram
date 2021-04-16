import React from "react";
import { Link, useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import * as ROUTES from "../constant/routes";
import "./SignIn.css";
import { auth } from "../firebase";
import ButtonSubmitting from "./ButtonSubmitting";

function SignIn() {
  const [input, setInput] = React.useState({ email: "", password: "" });
  const [error, setError] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const history = useHistory();
  let disabled = input.email === "" || input.password === "";

  const handleInput = (e) => {
    setInput((value) => ({ ...value, [e.target.name]: e.target.value }));
  };

  const setupSignIn = (e) => {
    e.preventDefault();
    setSubmitting(true);
    auth
      .signInWithEmailAndPassword(input.email, input.password)
      .then((data) => {
        setSubmitting(false);
        if (data.user) {
          history.push(ROUTES.HOME);
        }
      })
      .catch((err) => {
        setSubmitting(false);
        setError(err.message);
      });

    setInput({
      ...input,
      password: "",
    });
  };
  return (
    <>
      <Navbar />
      <div className="signin__root">
        <div className="signin__form">
          <h3>Sign In</h3>
          <form autoComplete="off" onSubmit={setupSignIn}>
            <input
              type="email"
              name="email"
              onChange={handleInput}
              placeholder="Email"
              aria-label="Email"
              value={input.email}
            />
            <input
              type="password"
              value={input.password}
              name="password"
              onChange={handleInput}
              placeholder="Password"
              aria-label="Password"
            />
            <ButtonSubmitting
              submitting={submitting}
              disabled={disabled}
              text="Sign in"
            />
          </form>
          {error && <p className="signin__error">{error}</p>}
          <p>
            Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign up</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignIn;
