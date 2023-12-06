
import './SelectArmy.css'
import { Link } from 'react-router-dom'

export default function CreateArmy() {

    return (
        <div className="select-army page bg-alt">
            <nav className="center-menu">
                <Link className='btn link option' to="ancients" state={{ list: 'Ancients' }}>Ancients</Link>
                <Link className='btn link option' to="medieval" state={{ list: 'Medieval' }}>Medieval</Link>
                <Link className='btn link option' to="for-king-and-parliament" state={{ list: 'For King and Parliament' }}>For King and Parliament</Link>
                <Link className='btn link option' to="old-world-battles" state={{ list: 'Old World Battles' }}>M2 Old World Battles</Link>
                <Link className='btn link option' to="lidless-eye" state={{ list: 'Lidless Eye' }}>M2 Lidless Eye</Link>
            </nav>
        </div>
    )
}
