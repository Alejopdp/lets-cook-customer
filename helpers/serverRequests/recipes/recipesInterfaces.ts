import { AxiosResponse } from "axios";
import { ServerRequestRespose } from "../serverRequestInterfaces/response";

export type RecipeResponse = ServerRequestRespose<Recipe[]>;

export interface Recipe {
    id: string;
    name: string;
    sku: string;
    shortDescription: string;
    longDescription: string;
    cookDuration: string;
    cookDurationNumberValue: number,
    difficultyLevel: string;
    imageUrl: string;
    weight: string;
    weightNumberValue: number,
    backOfficeTags: string[],
    imageTags: string[],
    availableWeeks: {
        id: string,
        label: string
    }[],
    availableMonths: string[],
    relatedPlans: string[],
    tools: any[], // TODO: by define Tools Type
    recipeVariants: RecipeVariant[];
}

export interface RecipeVariant {
    ingredients: string[],
    restrictions: any[] // TODO: by defined Restriction type
}