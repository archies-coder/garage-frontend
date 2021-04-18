import BillView from 'pages/bill/BillView'
import HomeView from 'pages/home/HomeView'
import VehicleForm from 'pages/vehicle/VehicleForm'

export interface IRoute {
    path: string
    component: React.Component
    exact?: boolean
}

const Routes = [
    {
        path: '/',
        exact: true,
        component: HomeView,
    },
    {
        path: '/vehicle',
        exact: true,
        component: VehicleForm,
    },
    {
        path: '/bill',
        exact: true,
        component: BillView,
    },
]

export default Routes
