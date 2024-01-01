import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'
import './App.css'

// Views
import ArmyForm from '@/pages/CreateArmy/ArmyForm/ArmyForm'
import RootView from '@/views/RootView/RootView'

// Pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import CreateOrder from '@/pages/CreateOrder/CreateOrder'
import MyOrders from '@/pages/MyOrders/MyOrders'
import BrowseArmies from '@/pages/BrowseArmies/BrowseArmies'
import SelectArmy from '@/pages/CreateArmy/SelectArmy/SelectArmy'
import CreateArmyView from '@/views/CreateArmyView/CreateArmyView'
import NameArmy from '@/pages/CreateArmy/NameArmy/NameArmy'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootView />}>
      <Route index element={<Home />} />
      <Route path="/create-order-of-battle" element={<CreateOrder />} />
      <Route path="/my-orders-of-battle" element={<MyOrders />} />
      <Route path="/browse-armies" element={<BrowseArmies />} />
      <Route path="/create-army-list" element={<CreateArmyView />}>
        <Route index element={<SelectArmy />} />
        <Route path=":setting" element={<NameArmy />} />
        <Route path=":setting/:army" element={<ArmyForm />} />
      </Route>
      <Route path="/about" element={<About />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
