import { Recipes } from "@stores";

export interface Restriction {
    id: string;
    value: string;
    text: string;
}

export interface SkippableOrder {
    id: string;
    weekLabel: string;
    shippingDate: string;
    isSkipped: boolean;
}

export interface WeekOrder {
    id: string;
    weekLabel: string;
    weekId: string;
    recipes: Recipes[];
    shippingDate: string;
}

export interface PlanDetailasSubscription {
    subscriptionId: string;
    plan: {
        planName: string;
        planVariantDescription: string;
        state: {
            state: string;
            stateTitle: string;
        };
        servingsLabel: string;
        price: number;
        priceLabel: string;
        icon: string;
    };
    shippingAddress: {
        addressName: string;
        addressDetails: string;
        preferredSchedule: string;
    };
    paymentMethod: {
        id: string;
        cardLabel: string;
        expirationDateLabel: string;
        default: boolean;
    };
    schedule: {
        nextDelivery: string;
        nextPayment: string;
    };
    hasChosenRecipesForActualWeek: boolean;
    hasChosenRecipesForNextWeek: boolean;
    actualWeekOrder: WeekOrder;
    nextWeekOrder: WeekOrder;
    skippedOrders: SkippableOrder[];
    canChooseRecipes: true;
    nextTwelveOrders: SkippableOrder[];
    hasRecipes: boolean;
    canChooseRecipesForNextWeekOrder: boolean;
}

export interface PlanDetailsProps {
    subscription: PlanDetailasSubscription;
    swapPlanData: { plans: any; variants: any };
    restrictions: Restriction[];
    handleClickOpenChangePlanModal: () => void;
    handleClickOpenCancelPlanModal: () => void;
    handleClickOpenSkipPlanModal: () => void;
    handleClickOpenRecipeModal: () => void;
}

export interface SkipPlanModalProps {
    open: boolean;
    handleClose: () => void;
    handlePrimaryButtonClick: (orders: SkippableOrder[]) => void;
    data: SkippableOrder[];
}

export interface CalendarCardProps {
    schedule: {
        nextDelivery: string;
        nextPayment: string;
    };
    skippedOrders: SkippableOrder[];
    handleClick: () => void;
}
