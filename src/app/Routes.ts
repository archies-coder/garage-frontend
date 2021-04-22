import ForgotPassword from 'pages/auth/ForgotPassword'
import SignIn from 'pages/auth/SignIn'
import SignUp from 'pages/auth/SignUp'
import BillForm from 'pages/bill/BillForm'
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
        path: '/signin',
        component: SignIn
    },
    {
        path: '/signup',
        component: SignUp
    },
    {
        path: '/forgotpassword',
        component: ForgotPassword
    },
    {
        path: '/vehicle',
        exact: true,
        component: VehicleForm,
    },
    {
        path: '/bill-form',
        exact: true,
        component: BillForm,
    },
    {
        path: '/bills',
        exact: true,
        component: BillView,
    },
]

export default Routes
