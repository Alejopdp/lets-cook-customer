import { Plan } from "types/plan";
import { PlanVariant } from "types/planVariant";

export interface AdditionalPlanCardProps {
    additionalPlan: Plan;
    selectedAttributes: { [key: string]: string };
}

export interface SelectVariantContentProps {
    variants: PlanVariant[];
    frequencies: string[];
    selectedFrequency: string;
    setselectedFrequency: (frequency: string) => void;
    selectedVariant: PlanVariant;
    setselectedVariant: (variant: PlanVariant) => void;
}

export interface AttributePickerProps {
    title: string;
    values: string[];
    handleAttributeClick: (attrName: string, attrValue: string) => void;
}

export interface FirstContentProps {
    name: string;
    description: string;
    minPrice: string;
}

export interface VariantSelectedContentProps {
    variant: PlanVariant;
    selectedFrequency: string;
}
