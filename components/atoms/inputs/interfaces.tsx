import { FormEvent } from "react";

export interface TextInputBaseProps {
    disabled?: boolean;
    label?: string;
    name?: string;
    value?: any;
    labelWidth?: number;
    helperText?: string;
    inputsProps?: Object;
    onChange: (e: FormEvent) => void;
    hasError: boolean;
}

export interface TextInputProps extends TextInputBaseProps {
    handleSubmit?: () => void;
    placeholder?: string;
    type?: string;
}

export interface PasswordInputProps extends TextInputBaseProps {
    handleSubmit?: () => void;
}
