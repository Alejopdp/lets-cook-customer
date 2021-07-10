import { ReactNode } from "react";

export interface CustomCheckboxProps {
    checked?: boolean,
    handleChange?: (e:React.FormEvent, checked: boolean ) => void,
    label?: ReactNode,
    value?: any,
    name?: string,
    className?: any
}