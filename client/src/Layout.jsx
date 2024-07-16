import Sidebar from "./components/Sidebar"
import SearchBar from "./components/SearchBar"
import { Outlet } from "react-router-dom"

export default function Layout() {
    return (
        <>
            <div className="main">
                <Sidebar />
                <Outlet />
            </div>
        </>


    )
}