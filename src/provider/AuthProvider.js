import React from "react";
import { auth } from "../firebase";
import { authContext } from "../hooks/useAuth";

function AuthProvider({ children }) {
  const AuthContext = authContext;
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, [setUser, user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
