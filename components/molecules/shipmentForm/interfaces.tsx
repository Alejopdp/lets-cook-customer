import { FormEvent } from "react";

export interface ShipmentFormProps {
    isFormCompleted: () => boolean;
    expanded: any;
    handleChangeAccordion: any;
    handleChangeStep: any;
    handleChange: any;
    deliveryData: any;
    handleAddressChange: any;
    isFormComplete: () => boolean;
    lang: any;
}
