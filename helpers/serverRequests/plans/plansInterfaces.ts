import { Recipe } from "../recipes";
import { ServerRequestRespose } from "../serverRequestInterfaces/response";

export type PlanResponse = ServerRequestRespose<{ plans: Plan[]; weekLabel: string }>;
export type AvailablePlanFrecuencies = string;
export type AdditionalPlans = Plan[];
export type PlanVariantAttribute = string[];
export type PlanType = "Main" | "Principal" | "Additional" | "Adicional";
export interface PlanVariant {
    id: string;
    sku: string;
    name: string;
    price?: number;
    priceWithOffer?: number;
    numberOfPersons?: number;
    numberOfRecipes?: number;
    attributes?: PlanVariantAttribute[];
}

export interface Plan extends PlanVariant {
    slug: string;
    description?: string;
    availablePlanFrecuencies?: AvailablePlanFrecuencies[];
    isActive?: boolean;
    type?: PlanType;
    hasRecipes?: Boolean;
    variants?: PlanVariant[];
    additionalPlans?: AdditionalPlans[];
    abilityToChooseRecipes?: boolean;
    imageUrl?: string;
    icon?: string;
    iconWithColor?: string;
    recipes?: Recipe[];
}
