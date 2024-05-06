import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    currentThem: 'dark'
}

const themSlice = createSlice({
    name: 'them',
    initialState: INITIAL_STATE,
    reducers: {
        setDark: (state) => {
            state.currentThem = 'dark'
        },
        setLight: (state) => {
            state.currentThem = 'light'
        }
    }
})

export const { setDark, setLight } = themSlice.actions;
export default themSlice.reducer