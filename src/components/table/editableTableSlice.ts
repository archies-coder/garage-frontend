import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
    editId: null | string
    menuId: null | string
    data: any[]
}

const initialState: IState = {
    editId: '',
    menuId: '',
    data: [],
}

const editableTable = createSlice({
    name: 'editableTable',
    initialState,
    reducers: {
        setEditId(state, { payload }: PayloadAction<string | null>) {
            state.editId = payload
        },
        setMenuId(state, { payload }: PayloadAction<string | null>) {
            state.menuId = payload
        },
        setData(state, { payload }: PayloadAction<any[]>) {
            state.data = payload
        },
    },
})

export const { setEditId, setMenuId, setData } = editableTable.actions

export default editableTable.reducer
