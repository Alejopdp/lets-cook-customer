import { FormEvent } from "react";
export interface RoundedCheckboxProps {
    name: string;
    checked: boolean;
    onChange: (e: FormEvent, checked: boolean) => void;
    label: string;
};