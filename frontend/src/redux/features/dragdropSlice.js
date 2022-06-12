import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: null,
    group: [],
    value: []
}

export const dragdropSlice = createSlice({
    name: 'dragdrop',
    initialState,
    reducers: {
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
})


export const { incrementByAmount } = dragdropSlice.actions

export default dragdropSlice.reducer