import Sidebar from "./components/Sidebar"
import SearchBar from "./components/SearchBar"
import { Outlet } from "react-router-dom"
import { useContext } from "react"
import { DataContext } from "./components/DataContext"

export default function Layout() {
    const {patientsList}= useContext(DataContext)
    console.log(patientsList)
    return (
        <>
            <div className="main">
                <Sidebar />
                <div className="content">
                    <Outlet />
                </div>

            </div>
        </>


    )
}