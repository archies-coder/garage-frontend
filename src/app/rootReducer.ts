import counterReducer from 'pages/counter/counterSlice';
import { combineReducers } from '@reduxjs/toolkit'
// import dummyReducer from 'pages/DummySlice'
import AuthReducer from 'pages/auth/AuthSlice'

const rootReducer = combineReducers({
    // dummy: dummyReducer
    counter: counterReducer,
    auth: AuthReducer
})

// export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
