import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from 'react-auth-kit';
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "react-query";
import './index.css';
import App from './App';
import { hydrate } from 'react-dom';
import { render } from 'react-dom';
// import AuthProvider from "./components/AuthProvider/AuthProvider";

// import { AxiosInterceptor } from './interceptors/axios.interceptor';

// Import custom interceptor
// AxiosInterceptor()
  const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
<QueryClientProvider client={queryClient}>
      <AuthProvider
      authType={"localstorage"}
      authName={"access_token"}
      cookieDomain={window.location.hostname}
    >
        <BrowserRouter>
           <App/>  
        </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

