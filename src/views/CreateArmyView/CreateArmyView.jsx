
import { Outlet } from 'react-router-dom'
import './CreateArmyView.css'

export default function CreateArmyView() {


    return (
        <div className="create-army view">
            <main>
                <Outlet />
            </main>
        </div>
    )
}
