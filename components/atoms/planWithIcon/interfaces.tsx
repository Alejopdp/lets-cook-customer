import { Plan } from "@helpers";

export interface PlanWithIconProp {
    isSelected: boolean;
    plan: Plan;
    onClick: (plan: Plan) => void;
}
