import { ReactNode } from 'react';
export interface TabPanelProps {
    id: string;
    children: ReactNode;
    index: any;
    value: any;
};
export interface RecipeVariantsTabProps {
    variants: string[];
    ingredientsLists: string[];
}