import { RecipeVariant } from "@stores";
import { ReactNode } from "react";
export interface TabPanelProps {
    id: string;
    children: ReactNode;
    index: any;
    value: RecipeVariant;
}
export interface RecipeVariantsTabProps {
    variants: RecipeVariant[];
    ingredientsLists: string[];
}
