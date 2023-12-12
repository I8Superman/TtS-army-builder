
import './Home.css'

import { Link } from 'react-router-dom'
export default function Home() {


    return (
        <div className="home page bg">
            <nav className="center-menu">
                <Link className='btn link' to="create-order-of-battle">Create Order of Battle</Link>
                <Link className='btn link' to="my-orders-of-battle">My orders of battle</Link>
                <Link className='btn link' to="browse-armies">Browse Army Lists</Link>
                <Link className='btn link' to="create-army-list">Create Army List</Link>
            </nav>
        </div>
    )
}
