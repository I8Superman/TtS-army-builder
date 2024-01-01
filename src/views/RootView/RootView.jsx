
import './RootView.css'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import arrowLeftWhite from '@/assets/svgs/arrow-left-white.svg'
import burgerMenuLightBlue from '@/assets/svgs/burger-menu-light-blue.svg'
import { useEffect, useState, useRef } from 'react';


export default function RootView() {
    const navigate = useNavigate();
    const location = useLocation();
    // const headerNav = useRef(null);
    const [altBg, setAltBg] = useState(false);

    useEffect(() => { // Set background classes depending on location
        if (location.pathname.includes('create')) {
            setAltBg(true);
        } else {
            setAltBg(false);
        }
    }, [location]);

    return (
        <div className={altBg ? "root view alt-bg" : "root view"} >
            <header className='header-nav'>
                <div className='icon go-back header-nav-item' onClick={() => navigate(-1)}>
                    <img src={arrowLeftWhite} alt="back-arrow" />
                </div>
                <nav className='burger-menu header-nav-item'>
                    <img src={burgerMenuLightBlue} alt="" />
                </nav>
            </header>
            <main className='main'>
                <Outlet />
            </main>
        </div>
    )
}
