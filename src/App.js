import React from "react";
import MainRouter from "./MainRouter";
import "./App.css";
import { ToastProvider } from "react-toast-notifications";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="app__root">
      <ToastProvider>
        <Router>
          <MainRouter />
        </Router>
      </ToastProvider>
    </div>
  );
}

export default App;
