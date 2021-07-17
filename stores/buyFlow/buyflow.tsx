import { Plan, PlanVariant } from "@helpers";
import create from "zustand";
import { combine, devtools } from "zustand/middleware";

export type PaymentMethodForm = {
    id: string;
    stripeId: string;
    type: string; // card / newPaymentMethod
};
export type Recipes = any;

export interface DeliveryForm {
    addressName: string;
    addressDetails: string;
    firstName: string;
    lastName: string;
    phone1: string;
    restrictions: string;
    latitude: number;
    longitude: number;
    shippingCost: number;
}

export interface BuyFlowStore {
    step: number;
    showRegister: boolean;
    form: {
        planCode: string;
        planSlug: string;
        variant?: PlanVariant;
        deliveryForm?: DeliveryForm;
        paymentMethod?: PaymentMethodForm;
        coupon?: Coupon;
        recipes: Recipes[];
        firstOrderId: string;
        subscriptionId: string;
    };
}

export interface Coupon {
    id: string;
    code: string;
    discount_type: {
        type: string;
        value: number;
    };
    minimum_requirement: {
        type: string;
        value: number;
    };
    apply_to: {
        type: string;
        value: string[];
    };
    limites: any[];
    coupons_by_subscription: {
        type: string;
        value: number;
    };
    date_rage: {
        start: string;
        expire: string;
    };
}
export interface Store extends BuyFlowStore {
    setRegisterState: (isVisible: boolean) => void;
    forward: () => void;
    setDeliveryInfo: (deliveryForm: Partial<DeliveryForm>) => void;
    setPaymentMethod: (paymentMethod: Partial<PaymentMethodForm>) => void;
    selectRecipes: (recipes: Recipes[]) => void;
    setPlanCode: (code: string, slug: string) => void;
    setPlanVariant: (variant: Partial<PlanVariant>) => void;
    setCoupon: (coupon: Partial<Coupon>) => void;
    setFirstOrderId: (firstOrderId: Partial<string>) => void;
    setSubscriptionId: (subscriptionId: Partial<string>) => void;
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
            attributes: [],
        },
        deliveryForm: {
            addressName: "",
            addressDetails: "",
            firstName: "",
            lastName: "",
            phone1: "",
            restrictions: "",
            latitude: null,
            longitude: null,
            shippingCost: 0,
        },
        paymentMethod: {
            id: "",
            type: "",
            stripeId: "",
        },
        coupon: {
            id: "",
            code: "",
            discount_type: {
                type: "",
                value: null,
            },
            minimum_requirement: {
                type: "none",
                value: null,
            },
            apply_to: {
                type: "all",
                value: [],
            },

            limites: [],
            coupons_by_subscription: {
                type: "",
                value: 0,
            },
            date_rage: {
                start: "",
                expire: "",
            },
        },
        recipes: [],
        subscriptionId: "",
        firstOrderId: "",
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

    setPlanCode: (code: string, slug: string = "") => {
        const form = get().form;
        form.planCode = code;
        form.planSlug = slug;
        set({ form });
    },
    setDeliveryInfo: (deliveryForm: DeliveryForm) => {
        const form = get().form;
        form.deliveryForm = { ...deliveryForm };
        set({ form });
    },
    setPaymentMethod: (paymentMethod: PaymentMethodForm) => {
        const form = get().form;
        form.paymentMethod = paymentMethod;
        set({ form });
    },
    selectRecipes: (recipes: Recipes[]) => {
        const form = get().form;
        form.recipes = recipes;
        set({ form });
    },
    setPlanVariant: (variant: PlanVariant) => {
        const form = get().form;
        form.variant = { ...variant };
        set({ form });
    },
    setCoupon: (coupon: Coupon) => {
        const form = get().form;
        form.coupon = { ...coupon };
        set({ form });
    },
    setFirstOrderId: (firstOrderId: string) => {
        const form = get().form;
        form.firstOrderId = firstOrderId;
        set({ form });
    },
    setSubscriptionId: (subscriptionId: string) => {
        const form = get().form;
        form.subscriptionId = subscriptionId;
        set({ form });
    },
}));

export const useBuyFlow = create(store);
