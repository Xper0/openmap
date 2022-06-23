import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    coordinates: [],
    crew: [],
    flightRoute: [],
    activeRoute: {
        roadColor: "#808080",
        flightRoute: []
    }

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
        setActiveRoute: (state, action) => {
            state.activeRoute = action.payload
        },
    },
})


export const { setCoordinates, setCrew, setFlightRoute, setActiveRoute } = mapSlice.actions

export default mapSlice.reducer