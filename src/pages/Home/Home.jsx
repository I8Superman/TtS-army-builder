
import './Home.css'

import { NavLink } from 'react-router-dom'
export default function Home() {


    return (
        <div className="home page bg">
            <nav className="center-menu">
                <NavLink className='btn link' to="/create-order-of-battle">Create Order of Battle</NavLink>
                <NavLink className='btn link' to="/my-orders-of-battle">My orders of battle</NavLink>
                <NavLink className='btn link' to="/browse-armies">Browse Army Lists</NavLink>
                <NavLink className='btn link' to="/create-army-list">Create Army List</NavLink>
            </nav>
        </div>
    )
}
