import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    initData: {
        routeBox: [],
        crewBox: [],

        flightRouteBox: [],
        flightCrewBox: []
    },
    dragData: ""

}

export const dragdropSlice = createSlice({
    name: 'dragdrop',
    initialState,
    reducers: {
        setInitData: (state, action) => {
            state.initData = action.payload
        },
        setDragData: (state, action) => {
            state.dragData = action.payload
        }
    },
})


export const { setInitData, setDragData } = dragdropSlice.actions

export default dragdropSlice.reducer