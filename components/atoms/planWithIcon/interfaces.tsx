import { Plan } from "@helpers";

export interface PlanWithIconProp {
    key: any;
    isSelected: boolean;
    plan: Plan;
    onClick: (plan: Plan) => void;
}
