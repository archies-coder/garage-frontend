import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from 'pages/counter/counterSlice'
import rootReducer from './rootReducer'

export const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
