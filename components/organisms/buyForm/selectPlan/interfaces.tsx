import { Plan, PlanVariant, Recipe } from "@helpers";
import { PlanUrlParams } from "../../../../pages/planes(old)/[slug]";

export interface SelectPlanProps {
    recipes: Recipe[];
    plans: Plan[];
    initialPlanSettings: PlanUrlParams;
    variant?: PlanVariant;
}

export type ARGS = { name: string; value: string };
