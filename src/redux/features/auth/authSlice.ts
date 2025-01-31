import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    token: string | null;
}

const initialState: AuthState = {
    token: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAccessToken(state, action: PayloadAction<string | null>) {
            console.log("Token being set in Redux:", action.payload);
            state.token = action.payload;
        },
    },
});

export const { setAccessToken } = authSlice.actions;
export default authSlice.reducer;
