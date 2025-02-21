// src/redux/features/recipe/recipesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {FoodRecipe} from "@/lib/definition";

// Define RecipeState Type
interface RecipeState {
    data: FoodRecipe[]; // Store recipes locally
    selectedRecipe: FoodRecipe | null;
    loading: boolean;
    error: string | null;
}

const initialState: RecipeState = {
    data: [],
    selectedRecipe: null,
    loading: false,
    error: null,
};

// Create Slice
const recipesSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        setRecipes: (state, action: PayloadAction<FoodRecipe[]>) => {
            state.data = action.payload;
        },
        setSelectedRecipe: (state, action: PayloadAction<FoodRecipe | null>) => {
            state.selectedRecipe = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

// Export Actions
export const { setRecipes, setSelectedRecipe, setLoading, setError } = recipesSlice.actions;

// Export Reducer
export default recipesSlice.reducer;
