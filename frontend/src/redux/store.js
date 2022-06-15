import { configureStore } from '@reduxjs/toolkit';
import dragdropSlice from "./features/dragdropSlice";
import mapSlice from "./features/mapSlice";

export const store = configureStore({
    reducer: {
        dragdropSlice,
        mapSlice
    },
})