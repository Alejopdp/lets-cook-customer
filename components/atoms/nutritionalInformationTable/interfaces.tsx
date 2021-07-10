export interface NutricionalInfo {
    name: string;
    key: string;
    value: string;
}
export interface NutritionalInformationTableProps {
    rows: NutricionalInfo[];
}