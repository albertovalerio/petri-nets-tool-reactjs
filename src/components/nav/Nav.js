import React from 'react'
import { NavLink } from "react-router-dom"
import * as Icon from 'react-feather'
import { useLocation } from 'react-router-dom'
import { routes as r } from "../../config/routes"
import './css/nav.css'
import { useDispatch } from 'react-redux'
import { setMobileMenu } from '../../features/controlsSlice'

export const Nav = ({classes, mobileCss}) => {

    const location = useLocation()
    const dispatch = useDispatch()

    const toggleMenu = (e) => {
        const el = e.target.closest('a')
        if (el.className.includes(classes.supOpen)) {
            el.classList.remove(classes.supOpen)
        } else {
            el.classList.add(classes.supOpen)
        }
    }

    return (
        <ul className={mobileCss ? 'border-t border-theme-29 py-5 ' + mobileCss : ''}>
            <li>
                <NavLink to={r.dashboard.uri} className={location.pathname === r.dashboard.uri ? classes.a + ' ' + classes.active : classes.a} onClick={() => dispatch(setMobileMenu({mobileCss:'hidden',openMenu:''}))}>
                    <div className={classes.icon}> <Icon.Home /> </div>
                    <div className={classes.title}>{r.dashboard.label}</div>
                </NavLink>
            </li>
            <li>
                <NavLink to={r.simulation.uri} className={r.simulation.children.map(u => u.uri).includes(location.pathname) ? classes.a + ' ' + classes.active : classes.a} onClick={(e) => toggleMenu(e)}>
                    <div className={classes.icon}> <Icon.GitPullRequest /> </div>
                    <div className={classes.title}>
                        { r.simulation.label }
                        <div className={classes.subIcon}> <Icon.ChevronDown /> </div>
                    </div>
                </NavLink>
                <ul>
                    <li>
                        <NavLink to={r.simulation.children[0].uri} className={({ isActive }) => isActive ? classes.a + ' ' + classes.active : classes.a} onClick={() => dispatch(setMobileMenu({mobileCss:'hidden',openMenu:''}))}>
                            <div className={classes.icon}> <Icon.ChevronRight /> </div>
                            <div className={classes.title}> {r.simulation.children[0].label} </div>
                        </NavLink>
                    </li>
                </ul>
            </li>
            <li>
                <NavLink to={r.analysis.uri} className={r.analysis.children.map(u => u.uri).includes(location.pathname) ? classes.a + ' ' + classes.active : classes.a} onClick={(e) => toggleMenu(e)}>
                    <div className={classes.icon}> <Icon.BarChart /> </div>
                    <div className={classes.title}>
                        {r.analysis.label}
                        <div className={classes.subIcon}> <Icon.ChevronDown /> </div>
                    </div>
                </NavLink>
                <ul>
                    {
                        r.analysis.children.map((l,i) => {
                            return (<li key={i}>
                                <NavLink to={l.uri} className={({ isActive }) => isActive ? classes.a + ' ' + classes.active : classes.a} onClick={() => dispatch(setMobileMenu({mobileCss:'hidden',openMenu:''}))}>
                                    <div className={classes.icon}> <Icon.ChevronRight /> </div>
                                    <div className={classes.title}> {l.label} </div>
                                </NavLink>
                            </li>)
                        })
                    }
                </ul>
            </li>
        </ul>
    )
}