import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { auth } from '../../firebase';

export const AuthContext = createContext();

export const useAuth = () => {
  const authCtx = useContext(AuthContext);
  return { isAuthenticated: authCtx?.user !== null, ...authCtx };
};

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(
    () =>
      auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          setUser(authUser);
        } else {
          setUser(null);
        }
      }),
    []
  );

  const value = useMemo(() => ({ user }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
