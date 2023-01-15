import React from 'react'
import * as Icon from 'react-feather'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { getRouteLabel } from '../../config/routes'


export const Topbar = () => {

    const location = useLocation()

    return (
        <div className="top-bar">
            <div className="-intro-x breadcrumb mr-auto hidden sm:flex">
                <Link to="/"><Icon.Home className="breadcrumb__icon" /></Link>
                <Icon.ChevronRight className="breadcrumb__icon" />
                <Link to="#" className="breadcrumb--active">{getRouteLabel(location.pathname)}</Link>
            </div>
        </div>
    )
}