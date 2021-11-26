import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './index.css';
import { Box } from '@material-ui/core';
import { checkUserNameExists, saveUser, createUserWithEmailAndPassword } from '../../services';
import routes from '../../utils/routes';
import LoadingButton from '../../components/LoadingButton';

function SignUp() {
  const [input, setInput] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const history = useHistory();
  const disabled =
    input.fullname === '' || input.username === '' || input.email === '' || input.password === '';

  const handleInput = (e) => {
    setInput((value) => ({ ...value, [e.target.name]: e.target.value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const usernameExists = await checkUserNameExists(input.username);
      if (usernameExists) {
        setSubmitting(false);
        setError('Username taken. Please try something else');
        setInput({
          ...input,
          password: '',
        });
      } else {
        const newUser = await createUserWithEmailAndPassword(input.email, input.password);

        await newUser.user.updateProfile({ displayName: input.fullname });

        await saveUser(newUser.user.uid, input.username, input.fullname, newUser.user.email);

        history.push(routes.home.path);
      }
    } catch (err) {
      setSubmitting(false);
      setInput({
        ...input,
        password: '',
      });
      setError(err.message);
    }
  };

  return (
    <div className="signup__root">
      <div className="signup__wrapper">
        <Box className="signup__header">
          <h2>Sign Up</h2>
          <p>Sign up to get started</p>
        </Box>
        <form autoComplete="off" className="signup__form">
          <input
            type="text"
            name="fullname"
            onChange={handleInput}
            placeholder="Fullname"
            aria-label="Fullname"
            value={input.fullname}
          />
          <input
            type="text"
            name="username"
            onChange={handleInput}
            placeholder="Username"
            aria-label="Username"
            value={input.username}
          />
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
            name="password"
            onChange={handleInput}
            placeholder="Password"
            aria-label="Password"
            value={input.password}
          />
          <LoadingButton
            disabled={disabled}
            onClick={handleSignUp}
            loading={submitting}
            className="signup__button"
            loadingText="Submitting..."
          >
            Sign up
          </LoadingButton>
        </form>
        <Box className="signin__errWrapper">
          {error && <p className="error signup__error">{error}</p>}
          <p>
            Have an account?
            <Link to={routes.signIn.path}>Sign in</Link>
          </p>
        </Box>
      </div>
    </div>
  );
}

export default SignUp;
