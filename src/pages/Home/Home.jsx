
import './Home.css'
import Card from '@/components/Card/Card'

import { NavLink } from 'react-router-dom'
import gladius from '@/assets/svgs/gladius-dark-purple-adjusted-orange.svg'
export default function Home() {


    return (
        <div className="home page">
            <h1>Home page yeah!</h1>
            <p className='sm-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo accusantium voluptatem similique sed beatae eius praesentium repellat obcaecati dolores placeat corrupti autem ipsam illo voluptas ut alias, vero vitae sit?
                In, tenetur. Officiis similique saepe nobis deleniti fuga placeat, eveniet repellendus minima at ipsam, consectetur quas, porro odio sequi. Provident id facere omnis ipsum maiores soluta aliquam esse quod ut.</p>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>


        </div>
    )
}
