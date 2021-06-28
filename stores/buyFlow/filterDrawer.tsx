import create from "zustand";
import { devtools } from 'zustand/middleware';

export type RecipeFilter = string;
export interface FilterDrawerStore {
    drawerIsOpen: boolean;
    filters: RecipeFilter[];
}

const FilterDrawerInitialState: FilterDrawerStore = {
    drawerIsOpen: false,
    filters: []
}

const store = devtools<FilterDrawerStore>((set, get) => ({
    ...FilterDrawerInitialState,
    setDrawerOpen: (drawerIsOpen: boolean) => set((state) => ({
        ...state,
        drawerIsOpen
    })),
    setFilters: (filters: RecipeFilter[]) => set((state) => ({
        ...state,
        filters
    })),
}))

export const useFilterDrawer = create(store);



