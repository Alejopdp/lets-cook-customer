import { Plan, Recipe } from "@helpers";
import { HowItWorks, Benefit } from "../sections/interfaces";

export interface HomePageProps {
    plans: Plan[];
    recipes: Recipe[];
    howItWorks: HowItWorks[];
    benefits: Benefit[];
}