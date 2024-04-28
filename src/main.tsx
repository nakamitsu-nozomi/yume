import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const element = document.getElementById('root');
element
  ? ReactDOM.createRoot(element).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
  : null;
