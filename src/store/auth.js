import {createSlice} from '@reduxjs/toolkit';

const initialAuthState = {
    isAuthenticated: false,
    fullName: null,
};

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.fullName = `${action.payload.firstName} ${action.payload.lastName}`;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.fullName = null;
        },
    },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
