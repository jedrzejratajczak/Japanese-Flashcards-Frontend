import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/index.css';
import { BrowserRouter } from 'react-router-dom';
import { worker } from './mocks/browser';

if (import.meta.env.VITE_ENABLE_MOCK_SERVER === 'true') {
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
