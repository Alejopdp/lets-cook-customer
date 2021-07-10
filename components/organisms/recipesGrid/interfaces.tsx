import { Recipe } from "@helpers";

export interface RecipesGridProps {
    recipesPage?: boolean,
    recipesSelection?: boolean,
    recipes: Recipe[]
}
