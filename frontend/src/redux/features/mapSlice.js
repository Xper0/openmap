import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    coordinates: [],
    crew: [],
    flightRoute: []

}

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setCoordinates: (state, action) => {
            state.coordinates = action.payload
        },
        setCrew: (state, action) => {
            state.crew = action.payload
        },
        setFlightRoute: (state, action) => {
            state.flightRoute = action.payload
        },
    },
})


export const { setCoordinates, setCrew, setFlightRoute } = mapSlice.actions

export default mapSlice.reducer