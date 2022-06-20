import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userInfo: {
        email: '',
        password: '',
    }
}

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.userInfo.email = action.payload;
        },
        setPassword: (state, action) => {
            state.userInfo.password = action.payload;
        },

    },
})


export const { setEmail, setPassword } = userInfoSlice.actions

export default userInfoSlice.reducer