import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './index.css';
import App from './App';
import AuthProvider from "./components/AuthProvider/AuthProvider";

// import { AxiosInterceptor } from './interceptors/axios.interceptor';

// Import custom interceptor
// AxiosInterceptor()

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <React.StrictMode>
           <App/>
          </React.StrictMode>
        </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);
