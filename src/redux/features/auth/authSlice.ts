import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {RootState} from "@/redux/store";

const initialState = {
    token: null as string | null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        clearAccessToken: (state) => {
            state.token = null;
        },
    },
});

export const { setAccessToken, clearAccessToken } = authSlice.actions;

export default authSlice.reducer;
// customize selector for easy component access
export const selectToken = (state: RootState) => state.auth.token;