import React from "react";
import MainRouter from "./MainRouter";
import "./App.css";
import { ToastProvider } from "react-toast-notifications";

function App() {
  return (
    <div className="app__root">
      <ToastProvider>
        <MainRouter />
      </ToastProvider>
    </div>
  );
}

export default App;
