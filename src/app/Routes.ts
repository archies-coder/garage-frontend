import ForgotPassword from 'pages/auth/ForgotPassword'
import BillForm from 'pages/bill/BillForm'
import BillView from 'pages/bill/BillView'
import HomeView from 'pages/home/HomeView'
import SparePartForm from 'pages/spare-part/SparePartForm'
import SparePartView from 'pages/spare-part/SparePartView'
import VehicleForm from 'pages/vehicle/VehicleForm'
import BillForm1 from "../pages/bill/BillForm1";

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
    // {
    //     path: '/signin',
    //     component: SignIn
    // },
    {
        path: '/spare-parts/add',
        component: SparePartForm,
    },
    {
        path: '/spare-parts',
        component: SparePartView,
    },
    {
        path: '/forgotpassword',
        component: ForgotPassword,
    },
    {
        path: '/vehicle',
        exact: true,
        component: VehicleForm,
    },
    {
        path: '/vehicle/:vehicleEntryId',
        exact: true,
        component: VehicleForm,
    },
    {
        path: '/bills/add',
        exact: true,
        component: BillForm1,
    },
    {
        path: '/bills/add/:vehicleEntryId',
        component: BillForm1,
    },
    {
        path: '/bills',
        exact: true,
        component: BillView,
    },
]

export default Routes
