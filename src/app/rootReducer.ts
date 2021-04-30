import counterReducer from 'pages/counter/counterSlice'
import { combineReducers } from '@reduxjs/toolkit'
// import dummyReducer from 'pages/DummySlice'
import AuthReducer from 'pages/auth/AuthSlice'
import BackdropReducer from './BackdropSlice'
import SnackbarReducer from './SnackbarSlice'
import VehicleReducer from 'pages/home/HomeSlice'

const rootReducer = combineReducers({
    // dummy: dummyReducer
    counter: counterReducer,
    auth: AuthReducer,
    backdrop: BackdropReducer,
    snackbar: SnackbarReducer,
    vehicles: VehicleReducer,
})

// export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
