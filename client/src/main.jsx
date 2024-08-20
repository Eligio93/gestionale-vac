import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Home.jsx'
import NewMachine from './NewMachine.jsx'

import NewPatient from './NewPatient.jsx'
import NewHospital from './NewHospital.jsx'
import NewTherapy from './NewTherapy.jsx'
import { DataProvider } from './components/DataContext.jsx'
import MachinesToReturn from './MachinesToReturn.jsx'
import DetailedResult from './components/DetailedResult.jsx'
import './styles/listedTherapies.css'
import './styles/popup.css'
import './styles/global.css'
import './styles/forms.css'
import './styles/home.css'
import './styles/mobileMenu.css'
import './styles/sidebar.css'
import './styles/buttons.css'

// import './index.css'

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
      },
      {
        path: '/ritiro',
        element: <MachinesToReturn />
      },
      {
        path: '/dettagliRisultato',
        element: <DetailedResult />
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
