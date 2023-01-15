import React from 'react'
import { Link } from "react-router-dom"
import { Nav } from "./Nav"
import * as Icon from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { getMobileMenu, setMobileMenu } from '../../features/controlsSlice'

export const NavMobile = () => {

    const classes = {
        a: 'menu',
        active: 'menu--active',
        icon: 'menu__icon',
        title: 'menu__title',
        subIcon: 'menu__sub-icon',
        supOpen: 'menu--open',
    }

    const dispatch = useDispatch()
    const { mobileCss, openMenu } = useSelector(getMobileMenu)

    const toggleMenu = () => {
        mobileCss === 'hidden' ? dispatch(setMobileMenu({mobileCss:'intro-y scrollable__content py-2'})) : dispatch(setMobileMenu({mobileCss:'hidden'}))
        openMenu === '' ? dispatch(setMobileMenu({openMenu:'mobile-menu--active'})) : dispatch(setMobileMenu({openMenu:''}))
    }

    return (
        <div className={'mobile-menu md:hidden ' + openMenu}>
            <div className="mobile-menu-bar">
                <Link to="/" className="flex mr-auto">
                    <img alt="logo" src="/images/logo_mobile_w.svg" className="w-52" />
                </Link>
                <button type="button" id="mobile-menu-toggler" onClick={toggleMenu}>
                    <Icon.BarChart2 className="w-8 h-8 text-white transform -rotate-90" />
                </button>
            </div>
            <div className="scrollable">
                <button type="button" className="mobile-menu-toggler" onClick={toggleMenu}> <Icon.XCircle className="w-8 h-8 text-white transform -rotate-90" /> </button>
                <Nav classes={classes} mobileCss={mobileCss} />
            </div>
        </div>
    )
}