import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/index.css'

import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'
import Modal from 'react-modal';
import { AppProvider } from './context/AppContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>,
)

Modal.setAppElement('#root');