type Size = "sm";

export interface QuantityBoxProps {
    label: string;
    state: boolean;
    name: string;
    onChange: (value: string) => void;
    value: string;
    size?: Size;
}
