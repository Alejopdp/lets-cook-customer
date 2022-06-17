import { RecipeSelection } from "types/recipe";

export interface RecipeChoiceScreenProps {
    recipes: any[];
    nextDeliveryLabel: string;
    maxRecipesQty: number;
    subscriptionId: string;
    actualChosenRecipes: RecipeSelection[];
    planId: string | undefined;
}
