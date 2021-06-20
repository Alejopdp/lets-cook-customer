import create from "zustand";

export const useBuyFlow = create((set, get) => ({
    step: 0,
    showRegister: true,
    form: {
        planCode: "",
        peopleQty: 0,
        recipesQty: 0,
        deliveryForm: {
            address: "",
            addressDesc: "",
            fristname: "",
            secondName: "",
            phone: "",
            restrictions: "",
        },
        paymentMethods: [],
        recipes: [],
    },
    setRegisterState: (isVisible = false) => set((state) => ({ ...state, showRegister: isVisible })),
    forward: () =>
        set((state) => {
            const step = state.showRegister ? state.step + 1 : state.step === 1 ? state.step + 2 : state.step + 1;
            return { ...state, step };
        }),
    setBuyFlowData: (data) => set((state) => ({ ...state, ...data })),
    setDeliveryInfo: (data) =>
        set((state) => ({
            ...state,
            form: {
                ...state.form,
                deliveryForm: {
                    ...state.form.deliveryForm,
                    ...data,
                },
            },
        })),
    setPaymentMetods: (data = []) =>
        set((data) => ({
            ...state,
            form: {
                ...state.form,
                paymentMethods: data,
            },
        })),
    selectRecipes: (data = []) =>
        set((state) => ({
            ...state,
            form: {
                ...state.form,
                recipes: data,
            },
        })),
}));

export const useFilterDrawer = create((set, get) => ({
    drawerIsOpen: false,
    filters: [],
    setDrawerOpen: (drawerIsOpen) => set((state) => ({ ...state, drawerIsOpen })),
    setFilters: (filters) => set((state) => ({ ...state, filters })),
}));

export const useRecipesBottomBar = create((set, get) => ({
    isOpen: true,
    showRecipesBottomBar: (isOpen) => set((state) => ({ ...state, isOpen }))
}));