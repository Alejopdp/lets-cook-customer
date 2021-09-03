import { Restriction, SkippableOrder } from "components/organisms/planDetails/interfaces";
import { Plan } from "types/plan";

export interface CancelPlanModalProps {
    handleClose: () => void;
    open: boolean;
    data: { reasons: { value: string; id: number; text: string }[] };
    handlePrimaryButtonClick: (reasonSelected: string, cancellationComment: string) => void;
    orders: SkippableOrder[];
    restrictions: Restriction[];
    subscriptionId: string;
    actualPlan: Plan;
    actualPlanVariantId: string;
}
