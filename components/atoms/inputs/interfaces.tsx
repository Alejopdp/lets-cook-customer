import { FormEvent } from "react";

export interface TextInputBaseProps {
    label?: string;
    name?: string;
    value?: any;
    labelWidth?: number;
    onChange: (e: FormEvent) => void;
}

export interface TextInputProps extends TextInputBaseProps {
    placeholder?: string;
    type?: string;
};

export interface PasswordInputProps extends TextInputBaseProps {};