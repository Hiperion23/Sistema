import React from 'react';
import ReactDOM from 'react-dom/client';
import {ClerkProvider} from '@clerk/clerk-react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {AuthProvider} from './Components/context/AuthProvider'
import App from './App';
import './index.css';
import NoMatch from './Components/NoMatch';

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={publishableKey}>
      <BrowserRouter>
      <AuthProvider>
        <Routes element>
            <Route index path='*' element={<App/>}/>
          <Route element={<NoMatch/>}/>
        </Routes>
      </AuthProvider>
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>,
)
