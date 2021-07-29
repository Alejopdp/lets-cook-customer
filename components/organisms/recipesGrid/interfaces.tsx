import { Recipe } from "@helpers";
import {Recipes} from "../../../stores/index"
export interface RecipesGridProps {
    recipesPage?: boolean,
    recipesSelection?: boolean,
    recipes: Recipe[] || Recipes[] // USe only one
}
