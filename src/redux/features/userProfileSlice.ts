import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
    accessToken: string | null;
    refreshToken: string | null;
    email: string | null;
    role: string | null;
    fullName: string | null;
    profileImage: string | null;
}

const initialState: UserState = {
    accessToken: null,
    refreshToken: null,
    email: null,
    role: null,
    fullName: null,
    profileImage: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.fullName = action.payload.fullName;
            state.profileImage = action.payload.profileImage;
        },
        clearUser: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.email = null;
            state.role = null;
            state.fullName = null;
            state.profileImage = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
