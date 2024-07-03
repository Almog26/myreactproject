import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext';
import { router } from './routes/router';
import { AuthContextProvider } from './context/AuthContext';
import { SearchProvider } from './context/SearchContext';
import  CardProvider  from './context/CardsContext';
import axios from 'axios';

axios.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers["x-auth-token"] = token
  }
  return req;
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeProvider>
        <SearchProvider>
          <CardProvider>
            <RouterProvider router={router} />
          </CardProvider>
        </SearchProvider>
      </ThemeProvider>
    </AuthContextProvider>
  </React.StrictMode>,
);
