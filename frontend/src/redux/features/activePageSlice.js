import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activePage: false,
    showActiveDetails: false,
    showActiveFilter: false
}

export const activePageSlice = createSlice({
    name: 'activePage',
    initialState,
    reducers: {
        setActivePage: (state, action) => {
            state.activePage = !action.payload
        },
        setShowActiveDetails: (state, action) => {
            state.showActiveDetails = !action.payload
        },
        setShowActiveFilter: (state, action) => {
            state.showActiveFilter = !action.payload
        }
    },
})


export const { setActivePage, setShowActiveDetails, setShowActiveFilter } = activePageSlice.actions

export default activePageSlice.reducer