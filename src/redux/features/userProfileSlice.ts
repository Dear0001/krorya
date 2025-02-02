// src/features/userProfile/userProfileSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserProfileState {
    id: number | null;
    fullName: string;
    email: string;
    profileImage: string;
    phoneNumber: string;
    role: string;
    createdAt: string;
    emailVerifiedAt: string;
    emailVerified: boolean;
    deleted: boolean;
}

const initialState: UserProfileState = {
    id: null,
    fullName: "",
    email: "",
    profileImage: "",
    phoneNumber: "",
    role: "",
    createdAt: "",
    emailVerifiedAt: "",
    emailVerified: false,
    deleted: false,
};

export const userProfileSlice = createSlice({
    name: "userProfile",
    initialState,
    reducers: {
        setUserProfile: (state, action: PayloadAction<UserProfileState>) => {
            return { ...state, ...action.payload };
        },
        clearUserProfile: (state) => {
            return initialState;
        },
    },
});

export const { setUserProfile, clearUserProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;