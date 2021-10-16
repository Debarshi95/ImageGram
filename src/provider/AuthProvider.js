import React from 'react';
import { auth } from '../firebase';

export const AuthContext = React.createContext();

export const useAuth = () => React.useContext(AuthContext);

function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);

  React.useEffect(
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

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
