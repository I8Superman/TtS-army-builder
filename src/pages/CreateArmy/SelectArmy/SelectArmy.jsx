
import Page from '@/components/Page/Page'
import './SelectArmy.css'
import { Link } from 'react-router-dom'

export default function CreateArmy() {

    return (
        <Page>
            <nav className="center-menu">
                <Link className='btn-link option' to="ancients" state={{ setting: 'Ancients' }}>Ancients</Link>
                <Link className='btn-link option' to="medieval" state={{ setting: 'Medieval' }}>Medieval</Link>
                <Link className='btn-link option' to="for-king-and-parliament" state={{ setting: 'For King and Parliament' }}>For King and Parliament</Link>
                <Link className='btn-link option' to="old-world-battles" state={{ setting: 'Old World Battles' }}>M2 Old World Battles</Link>
                <Link className='btn-link option' to="lidless-eye" state={{ setting: 'Lidless Eye' }}>M2 Lidless Eye</Link>
            </nav>
        </Page>
    )
}
