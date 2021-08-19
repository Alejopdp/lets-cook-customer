import { Recipes } from "@stores";

export interface RecipeModalProps {
    open: boolean;
    handleClose: () => void;
    recipe: Recipes;
    classes: any;
}
