import { FAQS, Plan, PlanVariant } from "@helpers";
import { PlanUrlParams } from "../../../../pages/planes/[slug]";

export interface SelectPlanProps {
    plans: Plan[];
    faqs: FAQS[];
    initialPlanSettings: PlanUrlParams;
    variant?: PlanVariant;
}

export type ARGS = { name: string; value: string };