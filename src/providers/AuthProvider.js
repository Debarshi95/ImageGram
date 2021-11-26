import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import 'firebase/auth';

export const AuthContext = createContext();

export const useAuth = () => {
  const authCtx = useContext(AuthContext);
  return { isAuthenticated: authCtx?.user !== null, ...authCtx };
};

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(
    () =>
      auth().onAuthStateChanged((authUser) => {
        if (authUser) {
          setUser(authUser);
        } else {
          setUser(null);
        }
      }),
    []
  );

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
