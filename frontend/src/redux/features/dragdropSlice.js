import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "../../axios";

export const fetchInitData = createAsyncThunk("dragdrop/createRoute", async () =>{
    const [ routesData, crewData, shipmentData ] = await Promise.all([
        axios.get("/createRoute"),
        axios.get("/crew"),
        axios.get("/shipment"),
    ])
    return {
        routesData: routesData.data.result,
        crewData: crewData.data.message,
        shipmentData: shipmentData.data.message
    }
})


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
    extraReducers: {
        [fetchInitData.fulfilled]: (state, action) => {
            state.initData.routeBox = action.payload.routesData;
            state.initData.crewBox = action.payload.crewData;
        }
    }
})


export const { setInitData, setDragData } = dragdropSlice.actions

export default dragdropSlice.reducer