export type ARGS = { name: string; value: string };
export interface PlanSizeProps {
    valueSelected: string;
    name: string;
    subtitle: string;
    numberItems: number;
    fromNumber: number;
    handleOnChange: (args: ARGS) => void;
}