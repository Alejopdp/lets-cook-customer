import { PlanWithIcon } from "@atoms"
import { Plan } from "@helpers"

interface PlansListProps {
    plans: Plan[];
    slug: string;
    handleOnSelectPlan: (e: Plan) => void
}
export const PlansList = (props: PlansListProps) => {

    return <>
        {
            props.plans.map((plan, index) => (
                <PlanWithIcon
                    key={index}
                    plan={plan}
                    isSelected={props.slug === plan.slug}
                    onClick={() => props.handleOnSelectPlan(plan)} />
            ))
        }
    </>

}