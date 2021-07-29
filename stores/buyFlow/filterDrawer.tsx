import { IFilter } from "@layouts";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface FilterDrawerStore {
    drawerIsOpen: boolean;
    filters: IFilter[];
}

interface Store extends FilterDrawerStore {
    setDrawerOpen: (drawerIsOpen: boolean) => void;
    setFilters: (filters: IFilter[]) => void;
}

const FilterDrawerInitialState: FilterDrawerStore = {
    drawerIsOpen: false,
    filters: [],
};

const store = devtools<Store>((set, get) => ({
    ...FilterDrawerInitialState,
    setDrawerOpen: (drawerIsOpen: boolean) =>
        set((state) => ({
            ...state,
            drawerIsOpen,
        })),
    setFilters: (filters: IFilter[]) =>
        set((state) => ({
            ...state,
            filters,
        })),
}));

export const useFilterDrawer = create(store);
