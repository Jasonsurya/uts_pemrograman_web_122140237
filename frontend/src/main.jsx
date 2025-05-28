import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';


import { ShopProvider } from './contexts/ShopContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Bungkus App dengan ShopProvider */}
    <ShopProvider>
      <App />
    </ShopProvider>
  </React.StrictMode>,
)
