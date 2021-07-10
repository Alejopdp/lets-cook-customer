import { ServerRequestRespose } from "../serverRequestInterfaces/response";

export type PlanResponse = ServerRequestRespose<Plan[]>;
export type AvailablePlanFrecuencies = string;
export type AdditionalPlans = string;
export type PlanVariantAttribute = string[];

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

export interface Plan {
    id?: string;
    name: string;
    sku?: string;
    description?: string;
    availablePlanFrecuencies?: AvailablePlanFrecuencies[];
    isActive?: boolean;
    type?: string;
    imageUrl?: string
    hasRecipes?: Boolean,
    variants?: PlanVariant[],
    additionalPlans?: AdditionalPlans[]
    price?: number;
    priceWithOffer?: number;
    numberOfPersons?: number;
    numberOfRecipes?: number;
    abilityToChooseRecipes?: boolean;
    slug: string;
    icon?: string;
    iconWithColor?: string;
}