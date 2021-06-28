import create from "zustand";
import { combine, devtools } from 'zustand/middleware';

export interface RecipeBottomBarStore {
    isOpen: boolean;
}

const RecipeBottomBarInitialState: RecipeBottomBarStore = {
    isOpen: true,
}

const store = devtools<RecipeBottomBarStore>((set, get) => ({
    ...RecipeBottomBarInitialState,
    showRecipesBottomBar: (open: boolean) => set((state) => ({ 
        ...state, 
        isOpen: open
    }))
}))

export const useRecipesBottomBar = create(store);