import { Plan, Recipe } from "@helpers";
import { Review } from "@helpers";

export interface RecipesSectionProps {
    recipes?: Recipe[];
    title: string;
    subtitle: string;
    titleAlign: string;
}
