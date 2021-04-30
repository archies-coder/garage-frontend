import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { getAllVehicleEntries } from 'api/vehicleEntry.api'
import { getBackdropStart, getBackdropStop } from 'app/BackdropSlice'
import { startSnackbar } from 'app/SnackbarSlice'
import { AppThunk } from 'app/store'
import { Links } from 'parse-link-header'
import { createNewVehicleEntry } from 'api/vehicleEntry.api'

export interface VehicleInfo {
    make: string
    model: string
    vehicleno: string
    name: string
    purpose: string
    remark: string
    vehicleType: string
    _id?: any
    city: any
    intime: any
    mobile: any
    outime: any
}

export const defaultVehicle: VehicleInfo = {
    _id: '',
    city: '',
    intime: new Date().toISOString(),
    mobile: '',
    name: '',
    outime: '',
    purpose: '',
    remark: '',
    vehicleno: '',
    make: '',
    model: '',
    vehicleType: '',
}

interface VehicleState {
    Vehicles: VehicleInfo[]
    VehiclesById: any
    currentVehicle: VehicleInfo
    currentPageVehicles: number[]
    pageCount: number
    pageLinks: Links | null
    isLoading: boolean
    error: string | null
    saveButtonActive: boolean
}

const VehiclesInitialState: VehicleState = {
    Vehicles: [],
    VehiclesById: {},
    currentVehicle: defaultVehicle,
    currentPageVehicles: [],
    pageCount: 0,
    pageLinks: {},
    isLoading: false,
    error: null,
    // filter: { vehicle: '', purpose: 'All Purpose', site: 'All Sites' },
    saveButtonActive: false,
}

function startLoading(state: VehicleState) {
    state.isLoading = true
}

function loadingFailed(state: VehicleState, action: PayloadAction<string>) {
    state.isLoading = false
    state.error = action.payload
}

const Vehicles = createSlice({
    name: 'Vehicles',
    initialState: VehiclesInitialState,
    reducers: {
        disableSaveButton(state: VehicleState) {
            state.saveButtonActive = false
        },
        enableSaveButton(state: VehicleState) {
            state.saveButtonActive = true
        },
        getVehiclesStart: startLoading,
        getVehiclesSuccess(state, { payload }) {
            const { pageCount, Vehicles } = payload
            state.pageCount = pageCount
            state.isLoading = false
            state.error = null
            state.Vehicles = Vehicles
            // @ts-ignore
            state.Vehicles.map(
                (vehicle) => (state.VehiclesById[vehicle._id] = vehicle)
            )
            //state.VehiclesById = state.Vehicles.map(vehicle => ({ ...vehicle, id: vehicle.id }))
        },
        getVehiclesFailure: loadingFailed,
        setCurrentVehicle(state, { payload }: PayloadAction<any>) {
            // const { _id, vehicleId, intime, purpose, remark } = payload
            // const {
            //     vehicleMake,
            //     vehicleModel,
            //     vehicleType,
            //     vehicleNo,
            // } = vehicleId
            // state.currentVehicle._id = _id
            // state.currentVehicle.make = vehicleMake
            // state.currentVehicle.model = vehicleModel
            // state.currentVehicle.vehicleType = vehicleType
            // state.currentVehicle.vehicleno = vehicleNo
            // state.currentVehicle.intime = intime
            // state.currentVehicle.purpose = purpose
            // state.currentVehicle.remark = remark
            state.currentVehicle = payload
        },
        // setFilter(state, { payload }: PayloadAction<any>) {
        //     state.filter = { ...state.filter, ...payload }
        // },
    },
})

export const {
    disableSaveButton,
    enableSaveButton,
    getVehiclesStart,
    getVehiclesSuccess,
    getVehiclesFailure,
    setCurrentVehicle,
    // setFilter,
} = Vehicles.actions

export default Vehicles.reducer

export const doAutoPopulateVehicle = (vehicleNo: string): AppThunk => async (
    dispatch
) => {
    try {
        const { data: vehicles, totalCount } = await getAllVehicleEntries(
            null,
            null,
            vehicleNo
        )
        vehicles.length > 0 && dispatch(setCurrentVehicle(vehicles[0]))
    } catch (err) {
        console.log(err)
    }
}

export const fetchVehicleById = (id?: any): AppThunk => async (dispatch) => {
    try {
        dispatch(getVehiclesStart())
        const Vehicles = await getAllVehicleEntries()
        dispatch(getVehiclesSuccess(Vehicles))
    } catch (err) {
        dispatch(getVehiclesFailure(err.toString()))
    }
}

export const fetchVehicles = (
    page?: number,
    count?: number,
    vehicle?: string,
    purpose?: string,
    site?: string
): AppThunk => async (dispatch) => {
    try {
        // dispatch(fetchSites())
        dispatch(getVehiclesStart())
        const { data, totalCount } = await getAllVehicleEntries(
            page,
            count,
            vehicle
        )
        dispatch(getVehiclesSuccess({ pageCount: totalCount, Vehicles: data }))
    } catch (err) {
        dispatch(getVehiclesFailure(err.toString()))
    }
}

export const postVehicleEntry = (
    vehicle: any,
    callback?: any
): AppThunk => async (dispatch: Dispatch<any>) => {
    debugger
    dispatch(getBackdropStart())
    try {
        debugger
        await createNewVehicleEntry(vehicle)
        callback && callback()
        dispatch(getBackdropStop())
        dispatch(
            startSnackbar({ message: 'Check-in has been created successfully' })
        )
    } catch (error) {
        dispatch(getBackdropStop())
        dispatch(
            startSnackbar({ message: error.message || 'Something went wrong' })
        )
    }
}

// export const fetchInOfficeVehicles = (
//     page?: number,
//     count?: number,
//     vehicle?: string,
//     purpose?: string,
//     site?: string
// ): AppThunk => async (dispatch) => {
//     try {
//         dispatch(getVehiclesStart())
//         const Vehicles = await getInOfficeVehicleData(
//             page,
//             count,
//             vehicle,
//             purpose,
//             site
//         )
//         dispatch(getVehiclesSuccess(Vehicles))

//         const pur = await getPurpose()
//         dispatch(getPurposeSuccess(pur))
//     } catch (err) {
//         dispatch(getVehiclesFailure(err.toString()))
//     }
// }
