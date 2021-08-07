import { Plan, PlanVariant } from "@helpers";
import create from "zustand";
import { combine, devtools } from "zustand/middleware";

export type PaymentMethodForm = {
    id: string;
    stripeId: string;
    type: string;
};

export type RecipeVariant = { id: string; ingredients: string[]; restriction: { id: string; value: string; label: string }; sku: string };
export type Recipes = {
    id: string;
    name: string;
    sku: string;
    shortDescription: string;
    longDescription: string;
    cookDuration: string;
    cookDurationNumberValue: number;
    difficultyLevel: string;
    imageUrl: string;
    weight: string;
    weightNumberValue: number;
    backOfficeTags: string[];
    imageTags: string[];
    availableWeeks: { id: string; label: string }[];
    availableMonths: string[];
    relatedPlans: string[];
    tools: string[];
    recipeVariants: RecipeVariant[];
};

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
    shippingDayLabel: string;
    nextShippingDate: string;
}

export interface BuyFlowStore {
    step: number;
    showRegister: boolean;
    form: {
        planCode: string;
        planName: string;
        planSlug: string;
        planDescription: string;
        weekLabel: string;
        variant?: PlanVariant;
        deliveryForm?: DeliveryForm;
        paymentMethod?: PaymentMethodForm;
        coupon?: Coupon;
        recipes: Recipes[];
        firstOrderId: string;
        subscriptionId: string;
        firstOrderShippingDate: string;
        canChooseRecipes: boolean;
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
    setShowRegister: (isVisible: boolean) => void;
    forward: () => void;
    moveNSteps: (stepsToMove: number) => void;
    toFirstStep: () => void;
    setDeliveryInfo: (deliveryForm: Partial<DeliveryForm>) => void;
    setPaymentMethod: (paymentMethod: Partial<PaymentMethodForm>) => void;
    selectRecipes: (recipes: Recipes[]) => void;
    setPlanCode: (code: string, slug: string, name: string, description: string, canChooseRecipes: boolean) => void;
    setPlanVariant: (variant: Partial<PlanVariant>) => void;
    setCoupon: (coupon: Partial<Coupon>) => void;
    setFirstOrderId: (firstOrderId: Partial<string>) => void;
    setSubscriptionId: (subscriptionId: Partial<string>) => void;
    setWeekLabel: (weekLabel: Partial<string>) => void;
    setFirstOrderShippingDate: (shippingDate: Partial<string>) => void;
    resetBuyFlowState: () => void;
}

export const BuyFlowInitialStore: BuyFlowStore = {
    step: 0,
    showRegister: true,
    form: {
        planCode: "",
        planName: "",
        planDescription: "",
        planSlug: "",
        weekLabel: "",
        variant: {
            id: "",
            sku: "",
            name: "",
            numberOfPersons: 0,
            numberOfRecipes: 0,
            attributes: [],
            label: "",
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
            shippingDayLabel: "",
            nextShippingDate: "",
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
        firstOrderShippingDate: "",
        canChooseRecipes: true,
    },
};

const store = devtools<Store>((set, get) => ({
    ...BuyFlowInitialStore,

    setShowRegister: (isVisible: boolean) => set({ showRegister: isVisible }),

    // TODO: Optimize this part the idea is controller
    // the steps during buy process.
    forward: (stepsToMove: number = 2) => {
        const indexStepToOmmit = 1;
        const previousStepToOmmit = indexStepToOmmit - 1;
        const _step = get().step;
        if (!get().showRegister && _step === previousStepToOmmit) {
            set({ step: _step + stepsToMove });
            return;
        }
        set({ step: _step + 1 });
    },

    moveNSteps: (stepsToMove: number) => {
        const _step = get().step;
        set({ step: _step + stepsToMove });
    },

    toFirstStep: () => {
        set({ step: 0 });
    },

    setWeekLabel: (weekLabel: string) => {
        const form = get().form;

        form.weekLabel = weekLabel;

        set({ form });
    },

    setPlanCode: (code: string, slug: string = "", name: string = "", description: string = "", canChooseRecipes: boolean) => {
        const form = get().form;
        form.planCode = code;
        form.planSlug = slug;
        form.planName = name;
        form.planDescription = description;
        form.canChooseRecipes = canChooseRecipes;
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
    setFirstOrderShippingDate: (shippingDate: string) => {
        const form = get().form;
        form.firstOrderShippingDate = shippingDate;
        set({ form });
    },
    resetBuyFlowState: () => {
        set({ form: BuyFlowInitialStore.form, step: 0, showRegister: BuyFlowInitialStore.showRegister });
    },
}));

export const useBuyFlow = create(store);
