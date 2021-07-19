import { ReactNode } from "react";

export interface CustomButtonProps {
    disabled?: boolean;
    onClick?: () => void;
    text: string;
    fullWidth?: boolean;
    icon?: ReactNode;
    smallButton?: boolean;
    style?: any;
}
