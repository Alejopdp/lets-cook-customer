import { AxiosResponse } from "axios";
import { ServerRequestRespose } from "../serverRequestInterfaces/response";

export type RecipeResponse = ServerRequestRespose<Recipe[]>;
export type RecipeTools = any; // TODO: by define Tools Type

export interface AvailableWeekend {
    id: string;
    label: string;
}

export interface Recipe {
    id?: string;
    name?: string;
    sku?: string;
    shortDescription?: string;
    longDescription?: string;
    cookDuration?: string;
    cookDurationNumberValue?: number;
    difficultyLevel?: string;
    imageUrl?: string;
    weight?: string;
    weightNumberValue?: number;
    backOfficeTags?: string[];
    imageTags?: string[];
    availableWeeks?: AvailableWeekend[];
    availableMonths?: string[];
    relatedPlans?: string[];
    recipeVariants?: RecipeVariant[];
    recipeNutritionalData?: any[];
    tools?: RecipeTools[]; // TODO: Join
    recipeTools?: RecipeTools[]; // TODO: Join
}

export interface RecipeVariant {
    ingredients: string[];
    restrictions: any[]; // TODO: by defined Restriction type
}
