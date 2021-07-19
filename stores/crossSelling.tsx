import { PlanVariant } from "types/planVariant";
import create from "zustand";
import { combine, devtools } from "zustand/middleware";

interface AdditionalVariantMAp {
    [planId: string]: {
        variant: PlanVariant;
        frequency: string;
    };
}

export interface CrossSellingStore {
    selectedPlans: AdditionalVariantMAp;
}

export interface Store extends CrossSellingStore {
    setselectedPlans: (newSelectedPlans: Partial<AdditionalVariantMAp>) => void;
}

export const CrossSellingInitialStore: CrossSellingStore = {
    selectedPlans: {},
};

const store = devtools<Store>((set, get) => ({
    ...CrossSellingInitialStore,

    setselectedPlans: (newSelectedPlans: AdditionalVariantMAp) => {
        var selectedPlans = get().selectedPlans;
        selectedPlans = newSelectedPlans;
        set({ selectedPlans });
    },
}));

export const useCrossSellingStore = create(store);
