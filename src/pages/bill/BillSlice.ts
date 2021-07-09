import { IBillResponse } from './../../api/bill.api'
import { ISingleVehicleEntry } from './../../models/vehicleEntry.model'
import { IVehicleEntryObject } from './../../api/vehicleEntry.api'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createBill, getBillsData } from 'api/bill.api'
import Api from '../../api'
import { getBackdropStart, getBackdropStop } from 'app/BackdropSlice'
import { startSnackbar } from 'app/SnackbarSlice'
import { AppThunk } from 'app/store'
import { IBill, IBillInput } from 'models/bill.model'
import { Links } from 'parse-link-header'

export interface BillsResult {
    //pageLinks: Links | null
    totalCount: number
    data: IBill[]
}

export interface IBillInputState {
    [key: number]: {
        item: string
        cost: number
    }
}
export interface IBillSparePartInputState {
    [key: number]: {
        name: string
        brand: string
        quantity: number
    }
}

export const defaultBill = {
    item: '',
    cost: 0,
}

export const defaultSparePart = {
    name: '',
    brand: '',
    quantity: 0,
}

export const defaultBillInputState: IBillInputState = {
    0: defaultBill,
    1: defaultBill,
}
export const defaultSparePartsInputState: IBillSparePartInputState = {
    0: defaultSparePart,
    1: defaultSparePart,
}

interface BillState {
    bills: IBill[]
    billsById: Record<string, IBill>
    currentPageBills: number[]
    pageCount: number
    pageLinks: Links | null
    isLoading: boolean
    error: string | null
    currentVehicleEntry: ISingleVehicleEntry | Record<string, never>
    currentBill: IBillInputState
    currentBillSpareParts: IBillSparePartInputState
}

const billsInitialState: BillState = {
    bills: [],
    billsById: {},
    currentPageBills: [],
    pageCount: 0,
    pageLinks: {},
    isLoading: false,
    error: null,
    currentVehicleEntry: {},
    currentBill: defaultBillInputState,
    currentBillSpareParts: defaultSparePartsInputState,
}

function startLoading(state: BillState) {
    state.isLoading = true
}

function loadingFailed(state: BillState, action: PayloadAction<string>) {
    state.isLoading = false
    state.error = action.payload
}

const bills = createSlice({
    name: 'bills',
    initialState: billsInitialState,
    reducers: {
        getBillsStart: startLoading,
        getBillsSuccess(state, { payload }: PayloadAction<BillsResult>) {
            const { totalCount, data } = payload
            state.pageCount = totalCount
            state.isLoading = false
            state.error = null
            state.bills = data
            state.bills.map((bill) => (state.billsById[bill._id] = bill))
        },
        getBillsFailure: loadingFailed,
        setCurrentVehicleEntry(
            state,
            { payload }: PayloadAction<ISingleVehicleEntry>
        ) {
            state.currentVehicleEntry = payload
        },
        setCurrentBill(state, { payload }: PayloadAction<any>) {
            state.currentBill = payload
        },
        addNewBillItem(state) {
            state.currentBill = {
                ...state.currentBill,
                [Object.keys(state.currentBill).length]: defaultBill,
            }
        },
        setCurrentBillSpareParts(
            state,
            { payload }: PayloadAction<IBillSparePartInputState>
        ) {
            state.currentBillSpareParts = payload
        },
        addNewSparePart(state) {
            state.currentBillSpareParts = {
                ...state.currentBillSpareParts,
                [Object.keys(state.currentBillSpareParts)
                    .length]: defaultSparePart,
            }
        },
    },
})

export const {
    getBillsStart,
    getBillsSuccess,
    getBillsFailure,
    setCurrentVehicleEntry,
    setCurrentBill,
    addNewBillItem,
    setCurrentBillSpareParts,
    addNewSparePart,
} = bills.actions

export default bills.reducer

export const fetchBills = (page?: number, count?: number): AppThunk => async (
    dispatch
) => {
    try {
        dispatch(getBillsStart())
        const bills = await Api.bill().getAll<IBillResponse>(page, count)

        dispatch(getBillsSuccess(bills))
    } catch (err) {
        dispatch(getBillsFailure(err.toString()))
    }
}

export const saveBill = (
    bill: IBillInput,
    callback?: () => void
): AppThunk => async (dispatch) => {
    try {
        dispatch(getBackdropStart())
        await Api.bill()
            .create(bill)
            .then((data) => {
                console.log(data.response)
                dispatch(getBackdropStop())
                let message
                if (data.code === 200) {
                    message = 'Spare Part has been created successfully'
                } else if (data.code === 401) {
                    message = 'Spare Part Name is already created'
                }
                dispatch(startSnackbar({ message }))
            })
            .catch(() => {
                dispatch(getBackdropStop())
                dispatch(startSnackbar({ message: 'Something went wrong' }))
            })
        //return setInputState(defaultInputState)
        callback && callback()
        //dispatch(saveInvitesSuccess(invites))
    } catch (err) {
        dispatch(getBackdropStop())
        dispatch(startSnackbar({ message: 'Something went wrong' }))
    }
}
