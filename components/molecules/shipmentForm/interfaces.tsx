import { FormEvent } from "react";

export interface ShipmentFormProps {
    address: string,
    clarifications: string,
    name: string,
    lastName: string,
    phoneNumber: number,
    registeredUser: boolean,
    restrictions: string,
    onChange: (e: FormEvent) => void,
    onClick: () => void,
};