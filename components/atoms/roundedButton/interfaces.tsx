import { ReactElement } from "react";

export type VariantsType = "content" | "flat" | "outline";

export interface RoundedButtonProps {
    variant?: VariantsType;
    label?: string;
    children?: ReactElement;
    style?: any;
    props?: any;
    onClick?: () => void;
    disabled?: boolean;
}
