import Sidebar from "./components/Sidebar"
import { Outlet } from "react-router-dom"


export default function Layout() {
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