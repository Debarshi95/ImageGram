import React from "react";
import { authContext } from "../hooks/useAuth";

function AuthProvider({ children }) {
  const AuthContext = authContext;
  const [user, setUser] = React.useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
