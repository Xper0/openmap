import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    socketFlightRoute: [],
}

export const overseerSlice = createSlice({
    name: 'overseer',
    initialState,
    reducers: {
        setSocketFlightRoute: (state, action) => {
            state.flightRoute = action.payload
        },
    },
})


export const { setSocketFlightRoute } = overseerSlice.actions

export default overseerSlice.reducer