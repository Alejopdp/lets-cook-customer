import { ReactNode } from "react";

export interface FormPaperWithIconsProps {
    initialIcon: string,
    title: string,
    finalIcons?: boolean,
    children?: ReactNode
    onClick?: () => void,
};
