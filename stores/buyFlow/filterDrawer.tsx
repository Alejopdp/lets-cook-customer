import create from "zustand";
import { devtools } from 'zustand/middleware';

type RecipeFilter = string;
interface FilterDrawerStore {
    drawerIsOpen: boolean;
    filters: RecipeFilter[];
}

interface Store extends FilterDrawerStore {
    setDrawerOpen: (drawerIsOpen: boolean) => void;
    setFilters: (filters: RecipeFilter[]) => void;
}

const FilterDrawerInitialState: FilterDrawerStore = {
    drawerIsOpen: false,
    filters: [],
}

const store = devtools<Store>((set, get) => ({
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



