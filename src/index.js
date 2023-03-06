import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Import router
import { BrowserRouter as Router } from 'react-router-dom'

// Import Properties CIC context
import PropertiesContextProvider from './context/context.properties'
import { AxiosInterceptor } from './interceptors/axios.interceptor';

// Import custom interceptor
AxiosInterceptor()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <PropertiesContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PropertiesContextProvider>
  </Router>

);
