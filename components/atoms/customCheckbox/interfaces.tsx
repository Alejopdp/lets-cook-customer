export type ColorsType = "primary" | "secondary" | "default";

export interface CustomCheckboxProps {
    name: string;
    checked: boolean;
    onChange: (e: React.FormEvent, checked: boolean) => void;
    color: ColorsType;
    label: string;
    redirectTo: string;
    boldText: string;
    className: string;
}

export interface CustomCheckboxWithPopupProps {
    name: string;
    checked: boolean;
    onChange: (e: React.FormEvent, checked: boolean) => void;
    color: ColorsType;
    label: string;
    boldText: string;
    handleOpenModal: any;
}
