import create from "zustand";
import { combine, devtools } from "zustand/middleware";

export type PaymentMethods = any;
export type Recipes = any;

export interface DeliveryForm {
    address: string;
    addressDesc: string;
    fristname: string;
    secondName: string;
    phone: string;
    restrictions: string;
}

export interface BuyFlowStore {
    step: number;
    showRegister: boolean;
    form: {
        planCode: string;
        peopleQty: string;
        recipesQty: string;
        deliveryForm: DeliveryForm;
        paymentMethods: PaymentMethods[];
        recipes: Recipes[];
    };
}

export interface Store extends BuyFlowStore {
    setRegisterState: (isVisible: boolean) => void;
    forward: () => void;
    setDeliveryInfo: (deliveryForm: DeliveryForm) => void;
    setPaymentMetods: (paymentMethods: PaymentMethods) => void;
    selectRecipes: (recipes: Recipes[]) => void;
    setPeopleQty: (qty: string) => void;
    setRecipesQty: (qty: string) => void;
    setPlanCode: (code: string) => void;
}

export const BuyFlowInitialStore: BuyFlowStore = {
    step: 0,
    showRegister: true,
    form: {
        planCode: "",
        peopleQty: "2",
        recipesQty: "3",
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
};

const store = devtools<Store>((set, get) => ({
    ...BuyFlowInitialStore,

    setRegisterState: (isVisible: boolean) => set({ showRegister: isVisible }),

    // TODO: Optimize this part the idea is controller
    // the steps during buy process.
    forward: () => {
        const indexStepToOmmit = 2;
        const _step = get().step;
        if (!get().showRegister && _step === indexStepToOmmit - 1) {
            set({ step: _step + 2 });
            return;
        }
        set({ step: _step + 1 });
    },

    setPlanCode: (code: string) => {
        const form = get().form;
        form.planCode = code;
        set({ form });
    },
    setRecipesQty: (qty: string) => {
        const form = get().form;
        form.recipesQty = parseInt(qty);
        set({ form });
    },
    setPeopleQty: (qty: string) => {
        const form = get().form;
        form.peopleQty = parseInt(qty);
        set({ form });
    },
    setDeliveryInfo: (deliveryForm: DeliveryForm) => {
        const form = get().form;
        form.deliveryForm = deliveryForm;
        set({ form });
    },
    setPaymentMetods: (paymentMethods: PaymentMethods) => {
        const form = get().form;
        form.paymentMethods = paymentMethods;
        set({ form });
    },
    selectRecipes: (recipes: Recipes[]) => {
        const form = get().form;
        form.recipes = recipes;
        set({ form });
    },
}));

export const useBuyFlow = create(store);
