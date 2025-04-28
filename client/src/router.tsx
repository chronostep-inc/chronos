import { createBrowserRouter } from 'react-router-dom'
import Top from './pages/Top/page'
import About from './pages/About/page'
import Layout from './layouts/layout'

export const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: Layout,
    children: [
      {
        index: true, 
        Component: Top,
      },
      {
        path: 'about',
        Component: About,
      }
    ]
  }
])
