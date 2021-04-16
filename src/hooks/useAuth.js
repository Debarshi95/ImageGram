import React from "react";

const authContext = React.createContext();

const useAuth = () => React.useContext(authContext);

export { authContext, useAuth };
