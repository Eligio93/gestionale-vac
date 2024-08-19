import Sidebar from "./components/Sidebar"
import MobileMenu from "./components/MobileMenu"

import { Outlet } from "react-router-dom"



export default function Layout() {
    return (
        <>
            <MobileMenu />
            <div className="main">
                <Sidebar />
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </>
    )
}