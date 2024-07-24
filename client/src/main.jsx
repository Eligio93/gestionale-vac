import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Home.jsx'
import NewMachine from './NewMachine.jsx'
import './index.css'
import NewPatient from './NewPatient.jsx'
import NewHospital from './NewHospital.jsx'
import NewTherapy from './NewTherapy.jsx'
import { DataProvider } from './components/DataContext.jsx'

//defines router and routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/nuovaMacchina',
        element: <NewMachine />
      },
      {
        path: '/nuovoPaziente',
        element: <NewPatient />
      },
      {
        path: '/nuovoOspedale',
        element: <NewHospital />
      },
      {
        path: '/nuovaTerapia',
        element: <NewTherapy />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  </React.StrictMode>,
)
