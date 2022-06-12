import { configureStore } from '@reduxjs/toolkit';
import dragdropSlice from "./features/dragdropSlice";

export const store = configureStore({
    reducer: {
        dragdropSlice,
    },
})