import { Recipe } from "../recipes";
import { ServerRequestRespose } from "../serverRequestInterfaces/response";

export type PlanResponse = ServerRequestRespose<Plan[]>;
export type AvailablePlanFrecuencies = string;
export type AdditionalPlans = string;
export type PlanVariantAttribute = string[];
export type PlanType = 'Main' | 'Principal' | 'Additional' | 'Adicional';
export interface PlanVariant {
    id: string;
    sku: string;
    name: {
        en?: string;
        es?: string;
        ca?: string;
    };
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
    recipes?: Recipe[]
}