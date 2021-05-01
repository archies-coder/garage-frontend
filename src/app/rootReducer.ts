import counterReducer from 'pages/counter/counterSlice'
import { combineReducers } from '@reduxjs/toolkit'
// import dummyReducer from 'pages/DummySlice'
import AuthReducer from 'pages/auth/AuthSlice'
import BackdropReducer from './BackdropSlice'
import SnackbarReducer from './SnackbarSlice'
import VehicleReducer from 'pages/home/HomeSlice'
import SparePartReducer from 'pages/spare-part/SparePartSlice'
import BillReducer from 'pages/bill/BillSlice'

const rootReducer = combineReducers({
    // dummy: dummyReducer
    counter: counterReducer,
    auth: AuthReducer,
    backdrop: BackdropReducer,
    snackbar: SnackbarReducer,
    VehicleEntries: VehicleReducer,
    spareParts: SparePartReducer,
    bills: BillReducer,
})

// export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
