import { configureStore } from '@reduxjs/toolkit'
import { kroryaApi } from './api'
import authSlice from './features/auth/authSlice'
import userSlice from './features/userProfileSlice'
import RecipesDateSlice from "@/redux/features/recipe/recipesDateSlice";
// create store
export const makeStore = () => {
    return configureStore({
        reducer: {
            user: userSlice,
            // Add the generated reducer as a specific top-level slice
            [kroryaApi.reducerPath]: kroryaApi.reducer,
            auth: authSlice,
            recipe: RecipesDateSlice
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(kroryaApi.middleware),
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>

export type AppDispatch = AppStore['dispatch']