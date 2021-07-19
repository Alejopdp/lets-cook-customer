import { PlanVariant } from "./planVariant";

export type Plan = {
    id: string;
    name: string;
    sku: string;
    description: string;
    availablePlanFrecuencies: string[];
    isActive: boolean;
    type: string;
    imageUrl: string;
    hasRecipes: boolean;
    variants: PlanVariant[];
    additionalPlans: Plan[];
    abilityToChooseRecipes: boolean;
    slug: string;
    icon: string;
    iconWithColor: string;
};
