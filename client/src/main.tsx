import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/index.css'
import { ToastContainer } from 'react-toastify';

import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'
import Modal from 'react-modal';
import { AppProvider } from './context/AppContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AppProvider>
  </StrictMode>,
)

Modal.setAppElement('#root');