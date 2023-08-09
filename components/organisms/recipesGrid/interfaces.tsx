import { Recipes } from "../../../stores/index";
export interface RecipesGridProps {
    recipes: Recipes[];
    recipesPage?: boolean;
    recipesSelection?: boolean;
    maxRecipesQty: number;
    handleClickRemoveRecipe?: (recipeId: string) => void;
    handleClickAddRecipe?: (recipe: any) => void;
    selectedRecipes?: any[];
}
