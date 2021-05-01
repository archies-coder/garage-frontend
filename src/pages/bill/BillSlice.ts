import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createBill, getBillsData } from 'api/bill.api'
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

export interface BillInputState {
    brand: string
    category: string
    quantity: number
    name: string
}

export const defaultInputState: BillInputState = {
    brand: '',
    category: '',
    quantity: 0,
    name: '',
}

interface BillState {
    bills: IBill[]
    billsById: Record<string, IBill>
    currentPageBills: number[]
    pageCount: number
    pageLinks: Links | null
    isLoading: boolean
    error: string | null
    currentBill: BillInputState
}

const billsInitialState: BillState = {
    bills: [],
    billsById: {},
    currentPageBills: [],
    pageCount: 0,
    pageLinks: {},
    isLoading: false,
    error: null,
    currentBill: defaultInputState,
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
            // @ts-ignore
            state.bills.map((bill) => (state.billsById[bill._id] = bill))
        },
        getBillsFailure: loadingFailed,
        setCurrentBill(state, { payload }: PayloadAction<BillInputState>) {
            state.currentBill = payload
        },
    },
})

export const {
    getBillsStart,
    getBillsSuccess,
    getBillsFailure,
    setCurrentBill,
} = bills.actions

export default bills.reducer

export const fetchBills = (page?: number, count?: number): AppThunk => async (
    dispatch
) => {
    try {
        dispatch(getBillsStart())
        const bills = await getBillsData(page, count)

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
        await createBill(bill)
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
