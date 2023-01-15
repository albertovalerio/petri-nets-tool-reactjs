import React from "react";
import { NavDesktop } from "./components/nav/NavDesktop";
import { NavMobile } from "./components/nav/NavMobile";
import { Topbar } from "./components/nav/Topbar";
import { Outlet, useLocation } from "react-router-dom";
import { Dashboard } from "./Dashboard";

const App = () => {

    const location = useLocation()
    
    return(
        <div className="main">
            <NavMobile />
            <div className="flex">
                <NavDesktop />
                <div className="content mt-14 md:mt-0">
                    <Topbar />
                    {
                        location.pathname === '/dashboard' ? <Dashboard /> : <Outlet />
                    }        
                </div>
            </div>
        </div>
    )
}

export default App