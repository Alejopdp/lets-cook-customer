import { PlanVariant } from "types/planVariant";

export interface AdditionalPlansGridProps {
    additionalPlans: any;
    selectedVariants: PlanVariant[];
    setselectedVariants: (planVariants: PlanVariant[]) => void;
}
