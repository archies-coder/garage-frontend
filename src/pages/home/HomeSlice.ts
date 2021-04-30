import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { getAllVehicles } from 'api/vehicle.api'
import {
    createNewVehicleEntry,
    getAllVehicleEntries,
} from 'api/vehicleEntry.api'
import { getBackdropStart, getBackdropStop } from 'app/BackdropSlice'
import { startSnackbar } from 'app/SnackbarSlice'
import { AppThunk } from 'app/store'
import { Links } from 'parse-link-header'

export interface VehicleInfo {
    make: string
    model: string
    vehicleNo: string
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
    vehicleNo: '',
    make: '',
    model: '',
    vehicleType: '',
}

interface VehicleEntriestate {
    VehicleEntries: VehicleInfo[]
    vehicles: any[]
    VehiclesByVehicleNo: any
    VehicleEntriesById: any
    currentVehicleEntry: VehicleInfo
    currentPageVehicleEntries: number[]
    pageCount: number
    pageLinks: Links | null
    isLoading: boolean
    error: string | null
    saveButtonActive: boolean
}

const VehicleEntriesInitialState: VehicleEntriestate = {
    VehicleEntries: [],
    vehicles: [],
    VehiclesByVehicleNo: {},
    VehicleEntriesById: {},
    currentVehicleEntry: defaultVehicle,
    currentPageVehicleEntries: [],
    pageCount: 0,
    pageLinks: {},
    isLoading: false,
    error: null,
    // filter: { vehicle: '', purpose: 'All Purpose', site: 'All Sites' },
    saveButtonActive: false,
}

function startLoading(state: VehicleEntriestate) {
    state.isLoading = true
}

function loadingFailed(
    state: VehicleEntriestate,
    action: PayloadAction<string>
) {
    state.isLoading = false
    state.error = action.payload
}

const VehicleEntries = createSlice({
    name: 'VehicleEntries',
    initialState: VehicleEntriesInitialState,
    reducers: {
        disableSaveButton(state: VehicleEntriestate) {
            state.saveButtonActive = false
        },
        enableSaveButton(state: VehicleEntriestate) {
            state.saveButtonActive = true
        },
        getVehiclesSuccess(state: VehicleEntriestate, { payload }) {
            state.vehicles = payload.data
            state.vehicles.map(
                (vehicle) =>
                    (state.VehiclesByVehicleNo[vehicle.vehicleNo] = vehicle)
            )
        },
        getVehicleEntriesStart: startLoading,
        getVehicleEntriesSuccess(state, { payload }) {
            const { pageCount, VehicleEntries } = payload
            state.pageCount = pageCount
            state.isLoading = false
            state.error = null
            state.VehicleEntries = VehicleEntries
            // @ts-ignore
            state.VehicleEntries.map(
                (vehicle) => (state.VehicleEntriesById[vehicle._id] = vehicle)
            )
            //state.VehicleEntriesById = state.VehicleEntries.map(vehicle => ({ ...vehicle, id: vehicle.id }))
        },
        getVehicleEntriesFailure: loadingFailed,
        setCurrentVehicleEntry(state, { payload }: PayloadAction<any>) {
            // const { _id, vehicleId, intime, purpose, remark } = payload
            // const {
            //     vehicleMake,
            //     vehicleModel,
            //     vehicleType,
            //     vehicleNo,
            // } = vehicleId
            // state.currentVehicleEntry._id = _id
            // state.currentVehicleEntry.make = vehicleMake
            // state.currentVehicleEntry.model = vehicleModel
            // state.currentVehicleEntry.vehicleType = vehicleType
            // state.currentVehicleEntry.vehicleNo = vehicleNo
            // state.currentVehicleEntry.intime = intime
            // state.currentVehicleEntry.purpose = purpose
            // state.currentVehicleEntry.remark = remark
            state.currentVehicleEntry = payload
        },
        // setFilter(state, { payload }: PayloadAction<any>) {
        //     state.filter = { ...state.filter, ...payload }
        // },
    },
})

export const {
    disableSaveButton,
    enableSaveButton,
    getVehicleEntriesStart,
    getVehiclesSuccess,
    getVehicleEntriesSuccess,
    getVehicleEntriesFailure,
    setCurrentVehicleEntry,
    // setFilter,
} = VehicleEntries.actions

export default VehicleEntries.reducer

export const doAutoPopulateVehicle = (vehicleNo: string): AppThunk => async (
    dispatch
) => {
    try {
        const { data: VehicleEntries, totalCount } = await getAllVehicleEntries(
            null,
            null,
            vehicleNo
        )
        VehicleEntries.length > 0 &&
            dispatch(setCurrentVehicleEntry(VehicleEntries[0]))
    } catch (err) {
        console.log(err)
    }
}

export const fetchAllVehicles = (): AppThunk => async (dispatch) => {
    dispatch(getBackdropStart())
    try {
        const response = await getAllVehicles()
        dispatch(getVehiclesSuccess(response))
        dispatch(getBackdropStop())
    } catch (error) {
        dispatch(getBackdropStop())
        console.log(error)
    }
}

export const fetchVehicleEntrById = (id?: any): AppThunk => async (
    dispatch
) => {
    try {
        dispatch(getVehicleEntriesStart())
        const VehicleEntries = await getAllVehicleEntries()
        dispatch(getVehicleEntriesSuccess(VehicleEntries))
    } catch (err) {
        dispatch(getVehicleEntriesFailure(err.toString()))
    }
}

export const fetchVehicleEntries = (
    page?: number,
    count?: number,
    vehicle?: string,
    purpose?: string,
    site?: string
): AppThunk => async (dispatch) => {
    try {
        // dispatch(fetchSites())
        dispatch(getVehicleEntriesStart())
        const { data, totalCount } = await getAllVehicleEntries(
            page,
            count,
            vehicle
        )
        dispatch(
            getVehicleEntriesSuccess({
                pageCount: totalCount,
                VehicleEntries: data,
            })
        )
    } catch (err) {
        dispatch(getVehicleEntriesFailure(err.toString()))
    }
}

export const postVehicleEntry = (
    vehicle: any,
    callback?: any
): AppThunk => async (dispatch: Dispatch<any>) => {
    dispatch(getBackdropStart())
    try {
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

// export const fetchInOfficeVehicleEntries = (
//     page?: number,
//     count?: number,
//     vehicle?: string,
//     purpose?: string,
//     site?: string
// ): AppThunk => async (dispatch) => {
//     try {
//         dispatch(getVehicleEntriesStart())
//         const VehicleEntries = await getInOfficeVehicleData(
//             page,
//             count,
//             vehicle,
//             purpose,
//             site
//         )
//         dispatch(getVehicleEntriesSuccess(VehicleEntries))

//         const pur = await getPurpose()
//         dispatch(getPurposeSuccess(pur))
//     } catch (err) {
//         dispatch(getVehicleEntriesFailure(err.toString()))
//     }
// }
