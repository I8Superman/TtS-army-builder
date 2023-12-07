
import './RootView.css'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import arrowLeftWhite from '@/assets/svgs/arrow-left-white.svg'
import burgerMenuLightBlue from '@/assets/svgs/burger-menu-light-blue.svg'

export default function RootView() {
    return (
        <div className="root view">
            <header className='header-nav'>
                <NavLink className='icon go-back header-nav-item'>
                    <img src={arrowLeftWhite} alt="back-arrow" />
                </NavLink>
                <nav className='burger-menu header-nav-item'>
                    <img src={burgerMenuLightBlue} alt="" />
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}
