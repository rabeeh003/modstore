import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: '',
    token: '',
    userDetails: '',
    register_id: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCleanUser: (state, action) => {
            state.user = ''
            state.token = ''
            state.register_id = ''
            state.userDetails = ''
        },
    },
})

export const { setCleanUser } = userSlice.actions;
export default userSlice.reducer;
