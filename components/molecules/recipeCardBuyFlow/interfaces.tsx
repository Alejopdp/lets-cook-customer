import { Recipe } from "@helpers";

export interface RecipeCardBuyFlowProps extends Recipe {
    handleClickOpenModal: () => void;
    handleClickAddRecipe: () => void;
    handleClickRemoveRecipe: () => void;
    isAddable: boolean;
    maxRecipesQty: number;
    selectedRecipes: any[];
}
