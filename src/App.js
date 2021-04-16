import React from "react";
import MainRouter from "./MainRouter";
import "./App.css";
import { auth } from "./firebase";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { setUser } = useAuth();
  React.useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setUser(user);
        // setUser(null);
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, [setUser]);
  return (
    <div className="app__root">
      <MainRouter />
    </div>
  );
}

export default App;
