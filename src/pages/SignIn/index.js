import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Box } from '@material-ui/core';
import LoadingButton from '../../components/LoadingButton';
import routes from '../../utils/routes';
import { signInWithEmailAndPassword } from '../../services';
import Input from '../../components/Input';
import './index.css';

function SignIn() {
  const [input, setInput] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const history = useHistory();
  const disabled = input.email === '' || input.password === '';

  const handleInput = (e) => {
    setInput((value) => ({ ...value, [e.target.name]: e.target.value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await signInWithEmailAndPassword(input.email, input.password);
      if (res?.user) {
        history.push(routes.home.path);
      }
    } catch (err) {
      setError(err?.message);
      setInput({
        ...input,
        password: '',
      });
      setSubmitting(false);
    }
  };
  return (
    <div className="signin__root">
      <div className="signin__wrapper">
        <Box className="signin__header">
          <h2>Sign in</h2>
          <p>Sign in to continue</p>
        </Box>
        <form autoComplete="off" className="signin__form">
          <Input
            type="email"
            name="email"
            onChange={handleInput}
            placeholder="Email"
            aria-label="Email"
            value={input.email}
          />
          <Input
            type="password"
            value={input.password}
            name="password"
            onChange={handleInput}
            placeholder="Password"
            aria-label="Password"
          />
          <LoadingButton
            disabled={disabled}
            onClick={handleSignIn}
            loading={submitting}
            className="signin__button"
            loadingText="Submitting..."
          >
            Sign in
          </LoadingButton>
        </form>
        <Box className="signin__errWrapper">
          {error && <p className="error signin__error">{error}</p>}
          <p>
            Don&apos;t have an account?
            <Link to={routes.signUp.path}>Sign up</Link>
          </p>
        </Box>
      </div>
    </div>
  );
}

export default SignIn;
