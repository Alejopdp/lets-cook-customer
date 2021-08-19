import { Plan } from "types/plan";
import { PlanVariant } from "types/planVariant";

export interface AdditionalPlanCardProps {
    additionalPlan: Plan;
    selectedAttributes: { [key: string]: string };
    selectedVariants: PlanVariant[];
    setselectedVariants: (variants: PlanVariant[]) => void;
}

export interface SelectVariantContentProps {
    variants: PlanVariant[];
    frequencies: string[];
    selectedFrequency: string;
    planId: string;
    setselectedFrequency: (frequency: string) => void;
    selectedVariants: PlanVariant[];
    setselectedVariants: (variants: PlanVariant[]) => void;
}

export interface AttributePickerProps {
    title: string;
    values: string[];
    selectedAttributes: { [key: string]: string };
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
