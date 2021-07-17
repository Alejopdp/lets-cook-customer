import { ReactNode } from "react";

export interface CustomButtonProps {
    disabled?: boolean;
    onClick?: () => void;
    text: string;
    icon?: ReactNode;
    smallButton?: boolean;
    style?: any;
}
