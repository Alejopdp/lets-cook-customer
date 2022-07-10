import { Recipes } from "@stores";
import { OrderState } from "types/order";

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
    isReanudable: boolean;
    state: OrderState;
}

export interface WeekOrder {
    id: string;
    weekLabel: string;
    weekId: string;
    recipes: Recipes[];
    shippingDate: string;
}

export interface PlanDetailsSubscription {
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
    planVariantId: string;
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
    portionsQuantity: number | undefined;
    portionPrice: number | undefined;
}

export interface PlanDetailsProps {
    subscription: PlanDetailsSubscription;
    swapPlanData: { plans: any; variants: any };
    restrictions: Restriction[];
    reload: () => void;
    handleClickOpenChangePlanModal: () => void;
    handleClickOpenCancelPlanModal: () => void;
    handleClickOpenSkipPlanModal: () => void;
    handleClickOpenRecipeModal: () => void;
    lang: any;
}

export interface SkipPlanModalProps {
    open: boolean;
    handleClose: () => void;
    handlePrimaryButtonClick: (orders: SkippableOrder[]) => void;
    data: SkippableOrder[];
    lang: any;
    isSubmitting: boolean;
}

export interface CalendarCardProps {
    schedule: {
        nextDelivery: string;
        nextPayment: string;
    };
    skippedOrders: SkippableOrder[];
    handleClick: () => void;
    lang: any;
    isOneTime: boolean;
}
