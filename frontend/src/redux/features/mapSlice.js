import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "../../axios";



export const fetchFlightRouter = createAsyncThunk("map/flightRouter", async () =>{
    const [ flightData] = await Promise.all([
        axios.get("/flightRouter"),
    ])
    return {
        flightRoute: flightData.data.message,
    }
})


const initialState = {
    coordinates: [],
    crew: [],
    flightRoute: [],
    activeRoute: {
        roadColor: "#808080",
        flightRoute: []
    },
    activeStep: 0,
    carMarker: []

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
        setCheckRoute: (state, action) => {
            state.activeStep = action.payload
        },
        setCarMarker: (state, action) => {
            state.carMarker = action.payload
        },
    },
    extraReducers: {
        [fetchFlightRouter.fulfilled]: (state, action) => {
            state.flightRoute = action.payload.flightRoute;
        }
    }
})


export const { setCoordinates, setCrew, setFlightRoute, setActiveRoute, setCheckRoute, setCarMarker } = mapSlice.actions

export default mapSlice.reducer