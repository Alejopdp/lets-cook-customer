export interface QuantityBoxProps {
    label: string;
    state: boolean;
    name: string;
    onChange: (value: string) => void;
    value: string;
};