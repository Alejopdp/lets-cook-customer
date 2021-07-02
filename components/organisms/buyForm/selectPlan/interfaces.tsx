import { FAQS, Plan } from "@helpers";
import { PlanUrlParams } from "../../../../pages/planes/[slug]";

export interface SelectPlanProps {
    plans: Plan[];
    faqs: FAQS[];
    initialPlanSettins: PlanUrlParams;
}

export type ARGS = { name: string; value: string };