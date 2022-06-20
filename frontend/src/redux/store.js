import { configureStore } from '@reduxjs/toolkit';
import dragdropSlice from "./features/dragdropSlice";
import mapSlice from "./features/mapSlice";
import userInfoSlice from "./features/userInfoSlice";

export const store = configureStore({
    reducer: {
        dragdropSlice,
        mapSlice,
        userInfoSlice
    },
})