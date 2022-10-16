import { Plan, Recipe, Review } from "@helpers";

export interface HomePageProps {
    plans: Plan[];
    recipes: Recipe[];
    reviews: Review[];
}
