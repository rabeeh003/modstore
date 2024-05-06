import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    admin: '',
    token: '',
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setCleanAdmin: (state, action) => {
            state.admin = ''
            state.token = ''
        },
    }
})
export const {setCleanAdmin} = adminSlice.actions;
export default adminSlice.reducer