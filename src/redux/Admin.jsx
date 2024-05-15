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
        setAdmin : (state, action) => {
            state.admin = 'admin'
            state.token = action.payload.access
        }
    }
})
export const {setCleanAdmin, setAdmin} = adminSlice.actions;
export default adminSlice.reducer