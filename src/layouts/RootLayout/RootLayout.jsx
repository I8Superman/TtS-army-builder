
import './RootLayout.css'
import bgImage from '@/assets/svgs/laurels-purple.svg'

import { Outlet } from 'react-router-dom'

export default function RootLayout() {
    return (
        <div className="root-layout">
            {/* <div className="bg-image-container">
                <img className='bg-image' src={bgImage} alt="background-image-laurels" />
            </div> */}
            <main>
                <Outlet />
            </main>
        </div>
    )
}
