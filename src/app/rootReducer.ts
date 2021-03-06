import counterReducer from 'pages/counter/counterSlice'
import { combineReducers } from '@reduxjs/toolkit'
// import dummyReducer from 'pages/DummySlice'
import AuthReducer from 'pages/auth/AuthSlice'
import BackdropReducer from './BackdropSlice'
import SnackbarReducer from './SnackbarSlice'
import VehicleReducer from 'pages/home/HomeSlice'
import SparePartReducer from 'pages/spare-part/SparePartSlice'
import BillReducer from 'pages/bill/BillSlice'
import HomeStatsReducer from 'pages/home/HomeStatsSlice'
import EditableTableReducer from 'components/table/editableTableSlice'

const rootReducer = combineReducers({
    // dummy: dummyReducer
    counter: counterReducer,
    auth: AuthReducer,
    backdrop: BackdropReducer,
    snackbar: SnackbarReducer,
    VehicleEntries: VehicleReducer,
    spareParts: SparePartReducer,
    bills: BillReducer,
    homeStats: HomeStatsReducer,
    editableTable: EditableTableReducer,
})

// export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
