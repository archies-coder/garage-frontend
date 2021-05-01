import { ISparePartInput } from './../../models/sparePart.model'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Links } from 'parse-link-header'

import { createSparePart, getSparePartsData } from 'api/sparePart.api'
import { AppThunk } from 'app/store'
import { getBackdropStart, getBackdropStop } from 'app/BackdropSlice'
import { startSnackbar } from 'app/SnackbarSlice'
import { ISparePart } from 'models/sparePart.model'

export interface SparePartsResult {
    //pageLinks: Links | null
    totalCount: number
    data: ISparePart[]
}

export interface SparePartInputState {
    brand: string
    category: string
    quantity: number
    name: string
}

export const defaultInputState: SparePartInputState = {
    brand: '',
    category: '',
    quantity: 0,
    name: '',
}

interface SparePartState {
    spareParts: ISparePart[]
    sparePartsById: Record<string, ISparePart>
    currentPageSpareParts: number[]
    pageCount: number
    pageLinks: Links | null
    isLoading: boolean
    error: string | null
    currentSparePart: SparePartInputState
}

const sparePartsInitialState: SparePartState = {
    spareParts: [],
    sparePartsById: {},
    currentPageSpareParts: [],
    pageCount: 0,
    pageLinks: {},
    isLoading: false,
    error: null,
    currentSparePart: defaultInputState,
}

function startLoading(state: SparePartState) {
    state.isLoading = true
}

function loadingFailed(state: SparePartState, action: PayloadAction<string>) {
    state.isLoading = false
    state.error = action.payload
}

const spareParts = createSlice({
    name: 'spareParts',
    initialState: sparePartsInitialState,
    reducers: {
        getSparePartsStart: startLoading,
        getSparePartsSuccess(
            state,
            { payload }: PayloadAction<SparePartsResult>
        ) {
            const { totalCount, data } = payload
            state.pageCount = totalCount
            state.isLoading = false
            state.error = null
            state.spareParts = data
            // @ts-ignore
            state.spareParts.map(
                (sparePart) => (state.sparePartsById[sparePart._id] = sparePart)
            )
        },
        getSparePartsFailure: loadingFailed,
        setCurrentSparePart(
            state,
            { payload }: PayloadAction<SparePartInputState>
        ) {
            state.currentSparePart = payload
        },
    },
})

export const {
    getSparePartsStart,
    getSparePartsSuccess,
    getSparePartsFailure,
    setCurrentSparePart,
} = spareParts.actions

export default spareParts.reducer

export const fetchSpareParts = (
    page?: number,
    count?: number
): AppThunk => async (dispatch) => {
    try {
        dispatch(getSparePartsStart())
        const spareParts = await getSparePartsData(page, count)

        dispatch(getSparePartsSuccess(spareParts))
    } catch (err) {
        dispatch(getSparePartsFailure(err.toString()))
    }
}

export const saveSparePart = (
    sparePart: ISparePartInput,
    callback?: () => void
): AppThunk => async (dispatch) => {
    try {
        dispatch(getBackdropStart())
        await createSparePart(sparePart)
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
