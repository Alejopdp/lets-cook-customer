import { ReactElement } from "react";
export type Variants = "content" | "flat" | "outline";
export interface CircularBottonProps {
    variant?: Variants;
    label?: string;
    children?: ReactElement;
}