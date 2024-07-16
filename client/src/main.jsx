import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Home.jsx'
import NewMachine from './NewMachine.jsx'
import './index.css'

//defines router and routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index:true,
        element:<Home />
      },
      {
        path:'/nuovaMacchina',
        element:<NewMachine />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
