import { Recipe } from "@helpers";
import { Recipes } from "../../../stores/index";
export interface RecipesGridProps {
    recipes: Recipe[] | Recipes[]; // USe only one
    recipesPage?: boolean;
    recipesSelection?: boolean;
    maxRecipesQty: number;
    handleClickRemoveRecipe?: (recipeId: string) => void;
    handleClickAddRecipe?: (recipe: any) => void;
    selectedRecipes?: any[];
}
