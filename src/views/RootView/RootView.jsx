
import './RootView.css'
import bgImage from '@/assets/svgs/laurels-purple.svg'

import { Outlet } from 'react-router-dom'

export default function RootView() {
    return (
        <div className="root view">
            <main>
                <Outlet />
            </main>
        </div>
    )
}
