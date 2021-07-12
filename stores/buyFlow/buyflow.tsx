import { Plan, PlanVariant } from "@helpers";
import create from "zustand";
import { combine, devtools } from "zustand/middleware";

export type PaymentMethods = {
    id: string
    label: string
    isDefault: string
};
export type Recipes = any;

export interface DeliveryForm {
    addressName: string;
    addressDetails: string;
    firstName: string;
    lastName: string;
    phone1: string;
    restrictions: string;
}

export interface BuyFlowStore {
    step: number;
    showRegister: boolean;
    form: {
        planCode: string;
        planSlug: string;
        variant?: PlanVariant;
        deliveryForm?: DeliveryForm;
        paymentMethods?: PaymentMethods[];
        recipes: Recipes[];
    };
}

export interface Store extends BuyFlowStore {
    setRegisterState: (isVisible: boolean) => void;
    forward: () => void;
    setDeliveryInfo: (deliveryForm: Partial<DeliveryForm>) => void;
    setPaymentMetods: (paymentMethods: Partial<PaymentMethods>) => void;
    selectRecipes: (recipes: Recipes[]) => void;
    setPlanCode: (code: string, slug: string) => void;
    setPlanVariant: (variant: Partial<PlanVariant>) => void;
}

export const BuyFlowInitialStore: BuyFlowStore = {
    step: 0,
    showRegister: true,
    form: {
        planCode: "",
        planSlug: "",
        variant: {
            id: "",
            sku: "",
            name: "",
            numberOfPersons: 0,
            numberOfRecipes: 0,
            attributes: []
        },
        deliveryForm: {
            addressName: "",
            addressDetails: "",
            firstName: "",
            lastName: "",
            phone1: "",
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

    setPlanCode: (code: string, slug: string = '') => {
        const form = get().form;
        form.planCode = code;
        form.planSlug = slug;
        set({ form });
    },
    setDeliveryInfo: (deliveryForm: DeliveryForm) => {
        const form = get().form;
        form.deliveryForm = { ...deliveryForm }
        set({ form });
    },
    setPaymentMetods: (paymentMethods: PaymentMethods[]) => {
        const form = get().form;
        form.paymentMethods = paymentMethods;
        set({ form });
    },
    selectRecipes: (recipes: Recipes[]) => {
        const form = get().form;
        form.recipes = recipes;
        set({ form });
    },
    setPlanVariant: (variant: PlanVariant) => {
        const form = get().form;
        form.variant = { ...variant }
        set({ form });
    }
}));

export const useBuyFlow = create(store);
