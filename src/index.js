import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';
import App from './App';
import AuthProvider from "./context/AuthProvider";
import {SearchProvider} from "./context/search";
import CartProvider from "./context/cart";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AuthProvider>
          <SearchProvider>
              <CartProvider>
                <App />
              </CartProvider>
          </SearchProvider>
      </AuthProvider>

  </React.StrictMode>
);


