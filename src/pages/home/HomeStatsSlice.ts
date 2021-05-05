import { getBackdropStart, getBackdropStop } from 'app/BackdropSlice'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getStats } from 'api/home.api'
import { AppThunk } from 'app/store'

interface IHomeStats {
    selectedDate?: string
    delivered: number
    in_garage: number
    parts_used: number
    total_customers: number
    vehicleEntriestats: number[]
}

interface homeStatsState extends IHomeStats {
    isLoading: boolean
    error: string | null
}

const homeStatsInitialState: homeStatsState = {
    selectedDate: new Date().toISOString(),
    delivered: 0,
    in_garage: 0,
    parts_used: 0,
    total_customers: 0,
    vehicleEntriestats: [0, 0, 0, 0, 0],
    isLoading: false,
    error: null,
}

function startLoading(state: homeStatsState) {
    state.isLoading = true
}

function loadingFailed(state: homeStatsState, action: PayloadAction<string>) {
    state.isLoading = false
    state.error = action.payload
}

const homeStats = createSlice({
    name: 'homeStats',
    initialState: homeStatsInitialState,
    reducers: {
        getHomeStatsStart: startLoading,
        getHomeStatsSuccess(state, { payload }: PayloadAction<any>) {
            const {
                delivered,
                in_garage,
                parts_used,
                total_customers,
                vehicleEntriestats,
            } = payload
            debugger
            state.delivered = delivered
            state.in_garage = in_garage
            state.parts_used = parts_used
            state.total_customers = total_customers
            state.isLoading = false
            state.error = null
            state.vehicleEntriestats = vehicleEntriestats
        },
        setSelectedDate(state, { payload }) {
            state.selectedDate = payload
        },
        getHomeStatsFailure: loadingFailed,
    },
})

export const {
    getHomeStatsStart,
    getHomeStatsSuccess,
    getHomeStatsFailure,
    setSelectedDate,
} = homeStats.actions

export default homeStats.reducer

export const fetchHomeStats = (selectedDate?: string): AppThunk => async (
    dispatch
) => {
    try {
        dispatch(getHomeStatsStart())
        dispatch(getBackdropStart())
        const { data } = await getStats(
            selectedDate ? selectedDate : new Date().toISOString()
        )
        debugger
        dispatch(getHomeStatsSuccess(data))
        dispatch(getBackdropStop())
    } catch (err) {
        dispatch(getHomeStatsFailure(err.toString()))
    }
}
