type Size = "sm";

export interface QuantityBoxProps {
    idForHtml: string;
    label: string;
    state: boolean;
    name: string;
    onChange: (value: string) => void;
    value: string;
    size?: Size;
}
