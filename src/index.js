import './utils/wydr';
import React from 'react';
import ReactDOM from 'react-dom';
import { ToastProvider } from 'react-toast-notifications';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import AuthProvider from './providers/AuthProvider';
import './index.css';
import PostsProvider from './providers/PostsProvider';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <PostsProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </PostsProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
