import create from "zustand";
import { combine, devtools, persist, StateStorage } from 'zustand/middleware';

export interface RecipeBottomBarStore {
  isOpen: boolean;
}

const RecipeBottomBarInitialState: RecipeBottomBarStore = {
  isOpen: true,
}

const _dev_store = devtools<RecipeBottomBarStore>((set, get) => ({
  ...RecipeBottomBarInitialState,
  showRecipesBottomBar: (open: boolean) => set((state) => ({
    ...state,
    isOpen: open
  }))
}))

// // Custom storage object
// const storage: StateStorage = {
//   getItem: async (name: string): Promise<string | null> => {
//     console.log(name, "has been retrieved");
//     return localStorage.getItem(name)
//     // return await get(name) || null
//   },
//   setItem: async (name: string, value: string): Promise<void> => {
//     console.log(name, "with value", value, "has been saved");
//     localStorage.setItem(name, value);
//     // set(name, value)
//   }
// }

// const _persist_store = persist<RecipeBottomBarStore>((set, get) => ({
//   ...RecipeBottomBarInitialState,
//   showRecipesBottomBar: (open: boolean) => set((state) => ({
//     ...state,
//     isOpen: open
//   }))
// }), {
//   name: "buy-flow-storage", // unique name
//   // getStorage: () => storage,
// });

export const useRecipesBottomBar = create<RecipeBottomBarStore>(_dev_store);