import React from 'react';
import './App.css';
import { ToastProvider } from 'react-toast-notifications';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRouter from './components/MainRouter';

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
